const express = require("express");
const orderController = require("../controllers/OrderController");

const orderRouter = express.Router();

orderRouter.post("/create", orderController.createOrder);
orderRouter.get("/get-order-details/:id", orderController.getOrderDetails);
orderRouter.get("/get-order-detail/:id", orderController.getOrderDetail);
orderRouter.delete("/cancel-order/:id", orderController.cancelOrderDetails);
orderRouter.get("/get-all-order", orderController.getAllOrder);

module.exports = orderRouter;
