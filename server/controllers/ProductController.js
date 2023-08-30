const Product = require("../models/ProductModel");

const productController = {
  createProduct: async (req, res) => {
    const { name, image, type, price, countInStock, rating, description } =
      req.body;
    if (!name || !image || !type || !price || !countInStock || !rating)
      return res.status(401).json({
        status: "ERR",
        message: "The input is required",
      });
    try {
      const checkProduct = await Product.findOne({ name: name });
      if (checkProduct)
        return res.json({
          status: "ERR",
          message: "The name of product is already",
        });
      const newProduct = await Product.create(req.body);
      return res.json({
        status: "OK",
        message: "SUCCESS",
        data: newProduct,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERR",
        message: error,
      });
    }
  },

  updateProduct: async (req, res) => {
    const productId = req.params.id;
    if (!productId) {
      return res.json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    try {
      const checkProduct = await Product.findOne({ _id: productId });
      if (!checkProduct) {
        return res.json({
          status: "OK",
          message: "The Product is not defined",
        });
      }
      const updateProduct = await Product.findByIdAndUpdate(
        { _id: productId },
        req.body,
        { new: true }
      );
      res.json({
        status: "OK",
        message: "SUCCESS",
        data: updateProduct,
      });
    } catch (error) {
      return res.json({
        status: "ERR",
        message: error,
      });
    }
  },

  detailProduct: async (req, res) => {
    const productId = req.params.id;
    try {
      const detailProduct = await Product.findOne({ _id: productId });
      if (!detailProduct)
        return res.json({
          status: "ERR",
          message: "The Product is not defined",
        });
      return res.status(200).json({
        status: "OK",
        message: "Get detail Product success",
        data: detailProduct,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERR",
        message: error,
      });
    }
  },

  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    if (!productId) {
      return res.json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    try {
      const checkProduct = await Product.findOne({ _id: productId });
      if (!checkProduct) {
        return res.json({
          status: "ERR",
          message: "The Product is not defined",
        });
      }
      const deleteProduct = await Product.findByIdAndDelete({ _id: productId });
      return res.json({
        status: "OK",
        message: "DELETE PRODUCT SUCCESS",
      });
    } catch (error) {
      return res.json({
        status: "ERR",
        message: error,
      });
    }
  },

  deleteManyProduct: async (req, res) => {
    const ids = req.body;
    if (!ids) {
      return res.json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    try {
      // const checkProduct = await Product.findOne({ _id: productId });
      // if (!checkProduct) {
      //   return res.json({
      //     status: "ERR",
      //     message: "The Product is not defined",
      //   });
      // }
      const deleteManyProduct = await Product.deleteMany({ _id: { $in: ids } });
      return res.json({
        status: "OK",
        message: "DELETE PRODUCT SUCCESS",
      });
    } catch (error) {
      return res.json({
        status: "ERR",
        message: error,
      });
    }
  },
  
  getAllType: async (req, res) => {
    try {
      const allType = await Product.distinct("type");
      return res.json({
        status: "OK",
        message: "Get type success",
        data: allType,
      });
    } catch (error) {
      res.json({
        status: "ERR",
        message: error,
      });
    }
  },
  getAllProduct: async (req, res) => {
    const { limit, page, sort, filter } = req.query;
    try {
      const parsedLimit = parseInt(limit, 10) || 10; /*|| 2;*/
      const parsedPage = parseInt(page, 10) || 1; /*|| 2;*/

      const totalProducts = await Product.countDocuments();
      const totalPages = Math.ceil(totalProducts / parsedLimit);

      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allProductSort = await Product.find()
          .limit(parsedLimit)
          .skip((parsedPage - 1) * parsedLimit)
          .sort(objectSort);
        return res.status(200).json({
          status: "OK",
          message: "Get all product success",
          data: allProductSort,
          totalProducts,
          totalPages,
          currentPage: parsedPage,
        });
      }

      if (filter) {
        const label = filter[0];
        const allProductFilter = await Product.find({
          [label]: { $regex: filter[1], $options: "i" },
        })
          .limit(parsedLimit)
          .skip((parsedPage - 1) * parsedLimit);

        return res.status(200).json({
          status: "OK",
          message: "Get all product success",
          data: allProductFilter,
          totalProducts,
          totalPages,
          currentPage: parsedPage,
        });
      }

      const allProduct = await Product.find()
        .limit(parsedLimit)
        .skip((parsedPage - 1) * parsedLimit);
      return res.status(200).json({
        status: "OK",
        message: "Get all product success",
        data: allProduct,
        totalProducts,
        totalPages,
        currentPage: parsedPage,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERR",
        message: error,
      });
    }
  },
};

module.exports = productController;
