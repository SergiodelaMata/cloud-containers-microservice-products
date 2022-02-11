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

  public static async saveProduct(req: Request): Promise<ProductEntity> {
    const product: ProductEntity = new ProductEntity();
    product.productId = uuidv4(); //genera un identificador
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.image = req.body.image;
    product.platform = null;
    product.company = null;        
    try {
      ProductModel.repository = await database
        .getConnection()
        .getRepository(ProductEntity);
      const productAux: ProductEntity = await ProductModel.getProductByName(product.name);
      if(!productAux)
      {
        await ProductModel.repository.save(product);

        return product;
      }
      else
      {
        console.log("Ya existía un registro del producto.");
        product.productId = "0";
        return product;
      }
    } catch (error) {
      console.log("Error al insertar el producto: " + error);
      product.productId = "-1";
      return product;
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
      product.platform = null;
      product.company = null;
      await ProductModel.repository.save(product);
      return true;
    } catch (error) {
      console.log("Error al actualizar el producto: " + error);
      return false;
    }
  }

  public static async updateProductQuantity(req: Request): Promise<boolean> {
    console.log(req.body);
    try {
      ProductModel.repository = await database
        .getConnection()
        .getRepository(ProductEntity);
      const product: ProductEntity = await ProductModel.getProduct(req.body.productId);
      console.log(product);
      product.quantity = req.body.quantity;
      await ProductModel.repository.save(product);
      return true;
    } catch (error) {
      console.log("Error al actualizar la cantidad del producto: " + error);
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
