import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import InvoiceProductModel from "./invoice.product.model";
import ProductModel from "./product.model";

@Table({
  tableName: "invoice",
  timestamps: false,
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  document: string;

  @Column({ allowNull: false })
  address_street: string;

  @Column({ allowNull: false })
  address_number: string;

  @Column({ allowNull: false })
  address_complement: string;

  @Column({ allowNull: false })
  address_city: string;

  @Column({ allowNull: false })
  address_state: string;

  @Column({ allowNull: false })
  address_zipCode: string;

  @BelongsToMany(() => ProductModel, {
    through: { model: () => InvoiceProductModel },
  })
  items: ProductModel[];

  @HasMany(() => InvoiceProductModel)
  userRoles!: InvoiceProductModel[];

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}
