import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import Product from "../domain/product";
import Address from "../domain/value-object/address";
import { InvoiceModel } from "./invoice.model";
import InvoiceProductModel from "./invoice.product.model";
import InvoiceRepository from "./invoice.repository";
import ProductModel from "./product.model";

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

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      InvoiceModel,
      InvoiceProductModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an invoice", async () => {
    const repository = new InvoiceRepository();
    const result = await repository.generate(invoice);

    expect(result.id.id).toEqual(invoice.id.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.address).toEqual(invoice.address);
    expect(result.items[0].id.id).toEqual(invoice.items[0].id.id);
    expect(result.items[0].name).toEqual(invoice.items[0].name);
    expect(result.items[0].price).toEqual(invoice.items[0].price);
    expect(result.items[1].id.id).toEqual(invoice.items[1].id.id);
    expect(result.items[1].name).toEqual(invoice.items[1].name);
    expect(result.items[1].price).toEqual(invoice.items[1].price);
  });

  it("should find an invoice", async () => {
    const repository = new InvoiceRepository();
    await repository.generate(invoice);
    const result = await repository.find(invoice.id.id);

    expect(result.id).toEqual(invoice.id);
    expect(result.createdAt).toEqual(invoice.createdAt);
    expect(result.name).toEqual(invoice.name);
    expect(result.address).toEqual(invoice.address);
    expect(result.items[0].id.id).toEqual(invoice.items[0].id.id);
    expect(result.items[0].name).toEqual(invoice.items[0].name);
    expect(result.items[0].price).toEqual(invoice.items[0].price);
    expect(result.items[1].id.id).toEqual(invoice.items[1].id.id);
    expect(result.items[1].name).toEqual(invoice.items[1].name);
    expect(result.items[1].price).toEqual(invoice.items[1].price);
  });
});
