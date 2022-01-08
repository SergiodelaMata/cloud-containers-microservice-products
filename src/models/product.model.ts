import { ProductEntity } from "../entities/product.entity";
import database from "../database/database";
import { Repository } from "typeorm";
import { Request } from "express";

export class ProductModel {
  private static repository: Repository<ProductEntity>;

  public static async getProducts(): Promise<ProductEntity[]> {
    ProductModel.repository = await database
      .getConnection()
      .getRepository(ProductEntity);
    return await ProductModel.repository.find();
  }



}
