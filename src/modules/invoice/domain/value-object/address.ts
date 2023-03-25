import ValueObject from "../../../@shared/domain/value-object/value-object.interface";

type AddressProps = {
  street: string;
  number: number;
  zip: string;
  city: string;
};

export default class Address implements ValueObject {
  _street: string;
  _number: number;
  _zip: string;
  _city: string;

  constructor({ city, number, street, zip }: AddressProps) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): number {
    return this.zip;
  }

  get city(): number {
    return this.city;
  }
}
