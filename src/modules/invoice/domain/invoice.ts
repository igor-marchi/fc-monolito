import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "./product";
import Address from "./value-object/address";

type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: Product[];
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _itens: Product[];

  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._itens = props.items;
  }

  get getName(): string {
    return this._name;
  }

  get getDocument(): string {
    return this._document;
  }

  get getAddress(): Address {
    return this._address;
  }
  get getItens(): Product[] {
    return this._itens;
  }

  get getTotal(): number {
    return this._itens.reduce((acc, item) => (acc += item.price), 0);
  }
}
