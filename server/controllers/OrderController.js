const Order = require("../models/OrderProductModel");
const Product = require("../models/ProductModel");
const sendEmailCreateOrder = require("../services/EmailService");

const orderController = {
  createOrder: async (req, res) => {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
      user,
      email,
    } = req.body;
    if (
      !paymentMethod ||
      !itemsPrice ||
      !shippingPrice ||
      !totalPrice ||
      !fullName ||
      !address ||
      !city ||
      !phone
    )
      return res.status(401).json({
        status: "ERR",
        message: "The input is required",
      });
    try {
      const promise = orderItems?.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order?.product,
            countInStock: { $gte: order.amount },
          },
          {
            $inc: {
              countInStock: -order.amount,
              selled: +order.amount,
            },
          },
          {
            new: true,
          }
        );
        if (productData) {
          return {
            status: "OK",
            message: "SUCCESS",
          };
        } else {
          return {
            status: "ERR",
            message: "ERR",
          };
        }
      });

      const newOrder = await Order.create({
        orderItems,
        shippingAddress: {
          fullName,
          address,
          city,
          phone,
          user,
        },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user,
      });
      if (newOrder) {
        await sendEmailCreateOrder(email, orderItems);
      }
      return res.json({
        status: "OK",
        message: "SUCCESS",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "ERR",
        message: error,
      });
    }
  },

  getOrderDetails: async (req, res) => {
    const orderId = req.params.id;
    try {
      const detailOrder = await Order.find({ user: orderId });
      if (!detailOrder)
        return res.json({
          status: "ERR",
          message: "The userId is not defined",
        });
      return res.status(200).json({
        status: "OK",
        message: "Get details order success",
        data: detailOrder,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERR",
        message: error,
      });
    }
  },

  getOrderDetail: async (req, res) => {
    const orderId = req.params.id;
    try {
      const detailOrder = await Order.findOne({ _id: orderId });
      if (!detailOrder)
        return res.json({
          status: "ERR",
          message: "The orderId is not defined",
        });
      return res.status(200).json({
        status: "OK",
        message: "Get detail order success",
        data: detailOrder,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERR",
        message: error,
      });
    }
  },

  cancelOrderDetails: async (req, res) => {
    const orderId = req.params.id;
    const data = req.body;
    try {
      // First, update product data
      const promises = data?.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order?.product,
          },
          {
            $inc: {
              countInStock: +order.amount,
              selled: -order.amount,
            },
          },
          {
            new: true,
          }
        );
        return productData;
      });

      // Wait for all product updates to complete
      const updatedProducts = await Promise.all(promises);

      // Then, delete the order
      const order = await Order.findByIdAndDelete(orderId);
      if (!order)
        return res.json({
          status: "ERR",
          message: "The orderId is not defined",
        });

      return res.status(200).json({
        status: "OK",
        message: "Cancel order success",
        data: order,
        dataUpdate: updatedProducts,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERR",
        message: error.message, // Get the error message
      });
    }
  },

  getAllOrder: async (req, res) => {
    try {
      const allOrder = await Order.find();
      return res.json({
        status: "OK",
        message: "Get all user success",
        data: allOrder,
      });
    } catch (error) {
      return res.json({
        status: "ERR",
        message: error,
      });
    }
  },
};
module.exports = orderController;
