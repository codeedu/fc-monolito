import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "./address.vo";
import Product from "./product.entity";

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
  private _items: Product[];

  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
  }

  add(product: Product) {
    this._items.push(product);
  }

  get total(): number {
    return this._items.reduce((total, item) => total + item.price, 0);
  }

  get items(): Product[] {
    return this._items;
  }

  get address(): Address {
    return this._address;
  }

  get document(): string {
    return this._document;
  }

  get name(): string {
    return this._name;
  }
}
