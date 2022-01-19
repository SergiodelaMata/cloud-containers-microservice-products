import { Request } from "express";
import { ProductEntity } from "../entities/product.entity";
import { ProductModel } from "../models/product.model";

export interface GetProducts {
  productData: ProductEntity | ProductEntity[];
  logged: boolean;
  userId: string;
  rol : string;
}

export interface GetProduct {
  productData: ProductEntity;
  logged: boolean;
  userId: string;
  rol : string;
}
export class ProductController {
  public static async getProducts(req: Request): Promise<GetProducts> {
    return {
      productData: await ProductModel.getProducts(),
      logged: false,
      userId: null,
      rol: null,
    };
  }

  public static async getProduct(req: Request): Promise<GetProduct> {
    return {
      productData: await ProductModel.getProduct(req.params.productId),
      logged: false,
      userId: null,
      rol: null,
    };
  }
  
  public static async getProductByName(req: Request): Promise<GetProduct> {
    return {
      productData: await ProductModel.getProductByName(req.params.name),
      logged: false,
      userId: null,
      rol: null,
    };
  }

  public static async saveProduct(req: Request): Promise<boolean> {
    return await ProductModel.saveProduct(req);
  }

  public static async updateProductQuantity(req: Request): Promise<boolean> {
    return await ProductModel.updateProductQuantity(req);
  }


  public static async updateProduct(req: Request): Promise<boolean> {
    return await ProductModel.updateProduct(req);
  }

  public static async deleteProduct(req: Request): Promise<boolean> {
    return await ProductModel.deleteProduct(req.params.productId);
  }

}
