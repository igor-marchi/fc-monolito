import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import Product from "../../domain/product";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";
import { GenerateInvoiceUseCaseInputDto } from "./generate-invoice.dto";
import Address from "../../../@shared/domain/value-object/address.value-object";

const address = new Address({
  city: "NT",
  complement: "Ao lado do parque",
  number: "12",
  state: "PE",
  street: "Ruas Das ostras",
  zipCode: "10000",
});

const product = new Product({
  id: new Id("1"),
  name: "Caixa",
  price: 100,
});

const product2 = new Product({
  id: new Id("2"),
  name: "Caixa2",
  price: 200,
});

const invoice = new Invoice({
  id: new Id("1"),
  name: "Caixa",
  document: "Document",
  items: [product, product2],
  address: address,
});

const MockRepository = () => {
  return {
    find: jest.fn(),
    generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Generate Invoice use case unit test", () => {
  it("should Generate an invoice", async () => {
    const repository = MockRepository();
    const useCase = new GenerateInvoiceUseCase(repository);
    const input: GenerateInvoiceUseCaseInputDto = {
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
    };
    const result = await useCase.execute(input);
    expect(repository.generate).toHaveBeenCalled();
    expect(result.id).toEqual(expect.any(String));
    expect(result.total).toEqual(invoice.total);
    expect(result.name).toEqual(invoice.name);
    expect(result.items[0].id).toEqual(invoice.items[0].id.id);
    expect(result.items[0].name).toEqual(invoice.items[0].name);
    expect(result.items[0].price).toEqual(invoice.items[0].price);
    expect(result.items[1].id).toEqual(invoice.items[1].id.id);
    expect(result.items[1].name).toEqual(invoice.items[1].name);
    expect(result.items[1].price).toEqual(invoice.items[1].price);
    expect(result.city).toEqual(invoice.address.city);
    expect(result.complement).toEqual(invoice.address.complement);
    expect(result.number).toEqual(invoice.address.number);
    expect(result.state).toEqual(invoice.address.state);
    expect(result.street).toEqual(invoice.address.street);
    expect(result.zipCode).toEqual(invoice.address.zipCode);
  });
});
