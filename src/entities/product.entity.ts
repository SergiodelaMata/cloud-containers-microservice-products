import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "product" })
export class ProductEntity {
  @PrimaryColumn("varchar", { length: 100 })
  productId: string;

  @Column("varchar", {length: 100 })
  name: string;

  @Column("varchar", {length: 500, nullable: true})
  description: string;

  @Column("float")
  price: number;

  @Column("int")
  quantity: number;

  @Column("longtext", {nullable: true})
  image: string;

  @Column("varchar", {length: 100 })
  platform: string;

  @Column("varchar", {length: 100 })
  company: string;
}
