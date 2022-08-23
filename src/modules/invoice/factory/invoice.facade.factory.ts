import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find/find.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate.usecase";

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacadeInterface {
    const repository = new InvoiceRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
    const findInvoiceUseCase = new FindInvoiceUseCase(repository);

    return new InvoiceFacade(
      repository,
      generateInvoiceUseCase,
      findInvoiceUseCase
    );
  }
}
