const express = require("express");
const productController = require("../controllers/ProductController");

const productRouter = express.Router();

productRouter.post("/create", productController.createProduct);
productRouter.put("/update/:id", productController.updateProduct);
productRouter.get("/detail/:id", productController.detailProduct);
productRouter.delete("/delete/:id", productController.deleteProduct);
productRouter.get("/get-all", productController.getAllProduct);
productRouter.post("/deletemany-product", productController.deleteManyProduct);
productRouter.get("/get-all-type", productController.getAllType);

module.exports = productRouter;
