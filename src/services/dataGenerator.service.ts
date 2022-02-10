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
      product1.description = "God of War es la secuela de God of War III, así como una continuación de la cronología canónica de God of War. A diferencia de las entregas anteriores, este juego se centra en la mitología nórdica y sigue a un Kratos mayor y más experimentado y a su hijo Atreus en los años transcurridos desde el tercer juego. Es en este mundo duro e implacable donde debe luchar para sobrevivir... y enseñarle a su hijo a hacer lo mismo.";
      product1.price = 19.90;
      product1.quantity = 5;
      product1.image = "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.png";
      product1.platform = "PS4";
      product1.company = "Sony";
      
      const product2: ProductEntity = new ProductEntity();
      product2.productId = uuidv4();
      product2.name = "Marvel's Spider-Man";
      product2.description = "Protagonizada por el superhéroe más icónico del mundo, Spider-Man presenta las habilidades acrobáticas, la improvisación y el lanzamiento de telarañas por las que es famoso el trepamuros, al tiempo que presenta elementos nunca antes vistos en un juego de Spider-Man. Desde atravesar con parkour y utilizar el entorno, hasta nuevos combates y escenarios de gran éxito, Spider-Man es diferente a cualquier otro que hayas jugado antes.";
      product2.price = 39.90;
      product2.quantity = 10;
      product2.image = "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r77.png";
      product2.platform = "PS4";
      product2.company = "Sony";

      const product3: ProductEntity = new ProductEntity();
      product3.productId = uuidv4();
      product3.name = "Pokémon Diamante Brillante";
      product3.description = "Vuelva a visitar la región de Sinnoh y la historia del juego Pokémon Versión Diamante. Experimente la nostálgica historia del juego Pokémon Versión Diamante en una aventura reimaginada, Pokémon Diamante Brillante, ¡ahora en el sistema Nintendo Switch! Las aventuras del juego Pokémon Diamante Brillante tendrán lugar en la familiar región de Sinnoh.";
      product3.price = 59.99;
      product3.quantity = 30;
      product3.image = "https://images.igdb.com/igdb/image/upload/t_cover_big/co3b9t.png";
      product3.platform = "Nintendo Switch";
      product3.company = "Nintendo";

      const product4: ProductEntity = new ProductEntity();
      product4.productId = uuidv4();
      product4.name = "Pokémon Perla Reluciente";
      product4.description = "Vuelva a visitar la región de Sinnoh y la historia del juego Pokémon Versión Perla. Experimente la nostálgica historia del juego Pokémon Versión Perla en una aventura reimaginada, Pokémon Perla Reluciente, ¡ahora en el sistema Nintendo Switch! Las aventuras del juego Pokémon Perla Reluciente tendrán lugar en la familiar región de Sinnoh.";
      product4.price = 59.99;
      product4.quantity = 30;
      product4.image = "https://images.igdb.com/igdb/image/upload/t_cover_big/co3b9s.png";
      product4.platform = "Nintendo Switch";
      product4.company = "Nintendo";

      const product5: ProductEntity = new ProductEntity();
      product5.productId = uuidv4();
      product5.name = "Halo Infinite";
      product5.description = "El Jefe Maestro regresa en Halo Infinite, el próximo capítulo de la legendaria franquicia. Cuando se pierde toda esperanza y el destino de la humanidad pende de un hilo, el Jefe Maestro está listo para enfrentarse al enemigo más despiadado que jamás haya enfrentado. Métete en la armadura del héroe más grande de la humanidad para vivir una aventura épica y explorar la enorme escala del anillo de Halo.";
      product5.price = 50.99;
      product5.quantity = 30;
      product5.image = "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dto.png";
      product5.platform = "Xbox Series X";
      product5.company = "343 Industries";

      try {
        await database
          .getConnection()
          .getRepository(ProductEntity)
          .save([product1, product2, product3, product4, product5]);
        console.log("Products created");
      } catch (error) {
        console.log("Error: " + error.message);
      }
      
    } else {
      console.log("There are already products on database, skipping...");
    }
  }
}
