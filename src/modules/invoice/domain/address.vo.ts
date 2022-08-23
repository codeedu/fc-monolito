type AddressProps = {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
};

export default class Address {
  private _street: string;
  private _number: string;
  private _complement: string;
  private _city: string;
  private _state: string;
  private _zipCode: string;

  constructor(props: AddressProps) {
    this._street = props.street;
    this._number = props.number;
    this._complement = props.complement;
    this._city = props.city;
    this._state = props.state;
    this._zipCode = props.zipCode;
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get complement(): string {
    return this._complement;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  get fullAddress(): string {
    return `${this._street}, ${this._number} - ${this._city} - ${this._state}`;
  }
}
