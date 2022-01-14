import { ProductEntity } from "../entities/product.entity";
import { v4 as uuidv4 } from "uuid";
import database from "../database/database";

export class DataGenerator {
  static async createProducts() {
    const Products: ProductEntity[] = await database
      .getConnection()
      .getRepository(ProductEntity)
      .find();
    if (Products.length === 0) {
      const product1: ProductEntity = new ProductEntity();
      product1.productId = uuidv4();
      product1.name = "God of War";
      product1.description = null;
      product1.price = 40.10;
      product1.quantity = 3;
      product1.image = null;
      product1.platform = "PS4";
      product1.company = "Sony";
      
      const product2: ProductEntity = new ProductEntity();
      product2.productId = uuidv4();
      product2.name = "Spiderman";
      product2.description = null;
      product2.price = 20.30;
      product2.quantity = 10;
      product2.image = null;
      product2.platform = "PS4";
      product2.company = "Sony";
      try {
        await database
          .getConnection()
          .getRepository(ProductEntity)
          .save([product1, product2]);
        console.log("Products created");
      } catch (error) {
        console.log("Error: " + error.message);
      }
      
    } else {
      console.log("There are already products on database, skipping...");
    }
  }
}
