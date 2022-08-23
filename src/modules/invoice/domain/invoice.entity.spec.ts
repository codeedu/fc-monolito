import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "./address.vo";
import Invoice from "./invoice.entity";
import Product from "./product.entity";

describe("Invoice unit test", () => {
  it("should calculate the invoice total", () => {
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Teste",
      document: "12345678901",
      address: new Address({
        street: "Rua Teste",
        number: "123",
        complement: "complemento",
        city: "Teste",
        state: "Teste",
        zipCode: "12345678",
      }),
      items: [
        new Product({
          id: new Id("1"),
          name: "Teste",
          price: 10,
        }),
        new Product({
          id: new Id("2"),
          name: "Teste 2",
          price: 20,
        }),
      ],
    });

    expect(invoice.total).toBe(30);
  });
});
