import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "./find.usecase.dto";

export default class FindInvoiceUseCase {
  constructor(private readonly _invoiceRepository: InvoiceGateway) {}

  async execute(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this._invoiceRepository.find(input.id);

    return this.toDTO(invoice);
  }

  private toDTO(invoice: any): FindInvoiceUseCaseOutputDTO {
    return {
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
        };
      }),
      createdAt: invoice.createdAt,
      total: invoice.total,
    };
  }
}
