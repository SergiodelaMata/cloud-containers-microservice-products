import { ProductEntity } from "../entities/product.entity";
import database from "../database/database";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";

export class ProductModel {
  private static repository: Repository<ProductEntity>;

  public static async getProducts(): Promise<ProductEntity[]> {
    ProductModel.repository = await database
      .getConnection()
      .getRepository(ProductEntity);
    return await ProductModel.repository.find();
  }

  public static async getProduct(productId: string): Promise<ProductEntity> {
    ProductModel.repository = await database
      .getConnection()
      .getRepository(ProductEntity);
    return await ProductModel.repository.findOne({ productId: productId });
  }

  public static async getProductByName(name: string): Promise<ProductEntity> {
    ProductModel.repository = await database
      .getConnection()
      .getRepository(ProductEntity);
    return await ProductModel.repository.findOne({ name: name });
  }

  public static async saveProduct(req: Request): Promise<boolean> {
    const product: ProductEntity = new ProductEntity();
    product.productId = uuidv4(); //genera un identificador
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.image = req.body.image;
    product.platform = req.body.platform;
    product.company = req.body.company;
        
    try {
      ProductModel.repository = await database
        .getConnection()
        .getRepository(ProductEntity);
      const productAux: ProductEntity = await ProductModel.getProductByName(product.name);
      if(!productAux)
      {
        await ProductModel.repository.save(product);
        return true;
      }
      else
      {
        console.log("Ya existía un registro del producto.");
        return false;
      }
    } catch (error) {
      console.log("Error al insertar el producto: " + error);
      return false;
    }
  }

  public static async updateProduct(req: Request): Promise<boolean> {
    try {
      ProductModel.repository = await database
        .getConnection()
        .getRepository(ProductEntity);
      const product: ProductEntity = await ProductModel.getProduct(req.body.productId);
      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
      product.quantity = req.body.quantity;
      product.image = req.body.image;
      product.platform = req.body.platform;
      product.company = req.body.company;
      await ProductModel.repository.save(product);
      return true;
    } catch (error) {
      console.log("Error al insertar el producto: " + error);
      return false;
    }
    
  }

  public static async deleteProduct(productId: string): Promise<boolean> {
    const productData: ProductEntity = await this.getProduct(productId);
    if (productData) {
      try {
        ProductModel.repository = await database
          .getConnection()
          .getRepository(ProductEntity);
        await ProductModel.repository.delete(productData.productId);
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

}
