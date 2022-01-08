import { Request } from "express";
import { ProductEntity } from "../entities/product.entity";

export interface GetProducts {
  productData: ProductEntity | ProductEntity[];
  logged: boolean;
  userId: string;
}

export interface GetProduct {
  productData: ProductEntity;
  logged: boolean;
  userId: string;
}
export class ProductController {
  public static async getProducts(req: Request): Promise<GetProducts> {
    return await {
      productData: null,
      logged: false,
      userId: null,
    };
  }

  public static async saveProduct(req: Request): Promise<GetProduct> {
    return await {
      productData: null,
      logged: false,
      userId: null,
    };
  }

  public static async deleteProduct(req: Request): Promise<boolean> {
    return null;
  }
}
