import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "product", timestamps: false })
export default class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;
}
