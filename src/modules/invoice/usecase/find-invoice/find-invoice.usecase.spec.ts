import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import Product from "../../domain/product";
import Address from "../../domain/value-object/address";
import FindInvoiceUseCase from "./find-invoice.usecase";
import { FindInvoiceUseCaseInputDTO } from "./find-invoice.usecase.dto";

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
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn(),
  };
};

describe("Find Invoice use case unit test", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository();
    const useCase = new FindInvoiceUseCase(repository);
    const input: FindInvoiceUseCaseInputDTO = {
      id: "1",
    };
    const result = await useCase.execute(input);
    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.id).toEqual(invoice.id.id);
    expect(result.createdAt).toEqual(invoice.createdAt);
    expect(result.total).toEqual(invoice.getTotal);
    expect(result.name).toEqual(invoice.getName);
    expect(result.items[0].id).toEqual(invoice.getItens[0].id.id);
    expect(result.items[0].name).toEqual(invoice.getItens[0].name);
    expect(result.items[0].price).toEqual(invoice.getItens[0].price);
    expect(result.items[1].id).toEqual(invoice.getItens[1].id.id);
    expect(result.items[1].name).toEqual(invoice.getItens[1].name);
    expect(result.items[1].price).toEqual(invoice.getItens[1].price);
    expect(result.address.city).toEqual(invoice.getAddress.getCity);
    expect(result.address.complement).toEqual(invoice.getAddress.getComplement);
    expect(result.address.number).toEqual(invoice.getAddress.getNumber);
    expect(result.address.state).toEqual(invoice.getAddress.getState);
    expect(result.address.street).toEqual(invoice.getAddress.getStreet);
    expect(result.address.zipCode).toEqual(invoice.getAddress.getZipCode);
  });
});
