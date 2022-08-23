import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address.vo";
import Invoice from "../domain/invoice.entity";
import invoiceEntity from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./item.model";

export default class InvoiceRepository implements InvoiceGateway {
  async create(invoice: invoiceEntity): Promise<void> {
    await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipcode: invoice.address.zipCode,
        items: invoice.items.map((item: Product) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
        total: invoice.total,
        createdAt: invoice.createdAt,
      },
      {
        include: [InvoiceItemModel],
      }
    );
  }
  find(id: string): Promise<invoiceEntity> {
    return InvoiceModel.findOne({
      where: {
        id,
      },
      include: [InvoiceItemModel],
    }).then((invoice: InvoiceModel) => {
      return new Invoice({
        id: new Id(invoice.id),
        name: invoice.name,
        document: invoice.document,
        address: new Address({
          street: invoice.street,
          number: invoice.number,
          complement: invoice.complement,
          city: invoice.city,
          state: invoice.state,
          zipCode: invoice.zipcode,
        }),
        items: invoice.items.map(
          (item: any) =>
            new Product({
              id: new Id(item.id),
              name: item.name,
              price: item.price,
            })
        ),
        createdAt: invoice.createdAt,
      });
    });
  }
}
