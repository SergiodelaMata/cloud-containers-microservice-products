import {ProductController, GetProducts, GetProduct} from "../../../controllers/product.controller"
import express, { Router, Request, Response} from "express";

const router: Router = express.Router();

router.get("/products", async(_req: Request, res: Response) =>{
  const productData: GetProducts = await ProductController.getProducts(_req);
  res.header("X-version","1");
  res.header("X-sender","product");
  res.header("X-destination","enrouting");
  res.send(productData);
})

router.get("/products/:productId", async(_req: Request, res: Response) =>{
  const productData: GetProduct = await ProductController.getProduct(_req);
  res.header("X-version","1");
  res.header("X-sender","product");
  res.header("X-destination","enrouting");
  res.send(productData);
})

router.get("/products/productByName/:name", async(_req: Request, res: Response) =>{
  const productData: GetProduct = await ProductController.getProductByName(_req);
  res.header("X-version","1");
  res.header("X-sender","product");
  res.header("X-destination","enrouting");
  res.send(productData);
})


router.post("/product", async(_req: Request, res: Response) => {
  const verify = await ProductController.saveProduct(_req);
  res.header("X-version","1");
  res.header("X-sender","product");
  res.header("X-destination","enrouting");
  if(verify)
  {
    res.status(200).send({status:"Saved"});
  }
  else
  {
    res.status(200).send({status:"Product already saved"});
  }
});

router.put("/product/update", async(_req: Request, res: Response) => {
  const verify = await ProductController.updateProduct(_req);
  res.header("X-version","1");
  res.header("X-sender","product");
  res.header("X-destination","enrouting");
  if(verify)
  {
    res.status(200).send({status:"Updated"});
  }
  else
  {
    res.status(200).send({status:"Product couldn't be updated"});
  }
});

router.put("/product/quantity/update", async(_req: Request, res: Response) => {
  const verify = await ProductController.updateProductQuantity(_req);
  res.header("X-version","1");
  res.header("X-sender","product");
  res.header("X-destination","enrouting");
  if(verify)
  {
    res.status(200).send({status:"Updated"});
  }
  else
  {
    res.status(200).send({status:"Product quantity couldn't be updated"});
  }
});

router.delete("/admin/product/:productId", async(_req: Request, res: Response) => {
  const verify = await ProductController.deleteProduct(_req);
  res.header("X-version","1");
  res.header("X-sender","product");
  res.header("X-destination","enrouting");
  if(verify)
  {
    res.status(200).send({status:"Deleted"});
  }
  else
  {
    res.status(200).send({status:"No product to be deleted"});
  }
});

export default router;
