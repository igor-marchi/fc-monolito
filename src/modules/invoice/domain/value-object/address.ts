import ValueObject from "../../../@shared/domain/value-object/value-object.interface";

type AddressProps = {
  street: string;
  number: string;
  city: string;
  zipCode: string;
  complement: string;
  state: string;
};

export default class Address implements ValueObject {
  private _street: string;
  private _number: string;
  private _zipCode: string;
  private _city: string;
  private _complement: string;
  private _state: string;

  constructor({
    city,
    number,
    street,
    zipCode,
    complement,
    state,
  }: AddressProps) {
    this._street = street;
    this._number = number;
    this._zipCode = zipCode;
    this._city = city;
    this._complement = complement;
    this._state = state;
  }

  get getStreet(): string {
    return this._street;
  }

  get getNumber(): string {
    return this._number;
  }

  get getZipCode(): string {
    return this._zipCode;
  }

  get getCity(): string {
    return this._city;
  }

  get getComplement(): string {
    return this._complement;
  }

  get getState(): string {
    return this._state;
  }
}
