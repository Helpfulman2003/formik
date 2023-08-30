const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const userController = {
  createUser: async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const regex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const isCheckEmail = regex.test(email);

    if (!email || !password || !confirmPassword)
      return res.json({
        status: "ERR",
        message: "The input is required",
      });
    else if (!isCheckEmail)
      return res.json({
        status: "ERR",
        message: "The input is email",
      });
    else if (password !== confirmPassword) {
      return res.json({
        status: "ERR",
        message: "The password is equal",
      });
    }
    try {
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        res.json({
          status: "ERR",
          message: "The email is already",
        });
      }

      const hash = bcrypt.hashSync(password, 10);
      const createUser = await User.create({
        email,
        password: hash,
      });
      res.json({
        message: "SUCCESS",
        status: "OK",
        data: createUser,
      });
    } catch (error) {
      return res.json({
        status: "ERR",
        message: error,
      });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    const regex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const isCheckEmail = regex.test(email);

    if (!email || !password)
      return res.status.json({
        status: "ERR",
        message: "The input is required",
      });
    else if (!isCheckEmail)
      return res.json({
        status: "ERR",
        message: "The input is email",
      });
    try {
      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        return res.json({
          status: "ERR",
          message: "The email is not defined",
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        return res.json({
          status: "ERR",
          message: "The password or user is incorrect",
        });
      }

      const accessToken = jwt.sign(
        { id: checkUser._id, isAdmin: checkUser.isAdmin, email },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "30s",
        }
      );

      const refreshToken = jwt.sign(
        { id: checkUser._id, isAdmin: checkUser.isAdmin, email },
        process.env.REFRESH_TOKEN,
        {
          expiresIn: "365d",
        }
      );

      const newUser = await User.findOne({ email }, "-password");

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      return res.json({
        message: "SUCCESS",
        status: "OK",
        data: newUser,
        accessToken: accessToken,
      });
    } catch (error) {
      return res.json({
        status: "ERR",
        message: error,
      });
    }
  },
  updateUser: async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
      return res.json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    try {
      const checkUser = await User.findOne({ _id: userId });
      if (!checkUser) {
        return res.json({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updateUser = await User.findByIdAndUpdate(
        { _id: userId },
        req.body,
        { new: true }
      );
      res.json({
        status: "OK",
        message: "SUCCESS",
        data: updateUser,
      });
    } catch (error) {
      return res.json({
        status: "ERR",
        message: error,
      });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
      return res.json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    try {
      const checkUser = await User.findOne({ _id: userId });
      if (!checkUser) {
        return res.json({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const deleteUser = await User.findByIdAndDelete({ _id: userId });
      res.json({
        status: "OK",
        message: "DELETE USER SUCCESS",
      });
    } catch (error) {
      return res.json({
        status: "ERR",
        message: error,
      });
    }
  },

  deleteManyUser: async (req, res) => {
    const ids = req.body;
    if (!ids) {
      return res.json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    try {
      // const checkUser = await User.findOne({ _id: ids });
      // if (!checkUser) {
      //   return res.json({
      //     status: "ERR",
      //     message: "The ids is not defined",
      //   });
      // }
      const deleteManyUser = await User.findByIdAndDelete({ _id: {$in: ids}});
      res.json({
        status: "OK",
        message: "DELETE USER SUCCESS",
      });
    } catch (error) {
      return res.json({
        status: "ERR",
        message: error,
      });
    }
  },

  getAllUser: async (req, res) => {
    try {
      const allUser = await User.find({}, "-password");
      return res.json({
        status: "OK",
        message: "Get all user success",
        data: allUser,
      });
    } catch (error) {
      return res.json({
        status: "ERR",
        message: error,
      });
    }
  },

  getDetailUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const detailUser = await User.findOne({ _id: userId }, "-password");
      if (!detailUser)
        return res.json({
          status: "ERR",
          message: "The user is not defined",
        });
      return res.json({
        status: "OK",
        message: "Get detail user success",
        data: detailUser,
      });
    } catch (error) {
      return res.json({
        status: "ERR",
        message: error,
      });
    }
  },

  refreshToken: async (req, res) => {
    //take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.json({
        status: "ERR",
        message: "You are not athenticated",
      });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
      if (err) {
        return res.json({
          status: "ERROR",
          message: "Token is not valid",
        });
      }

      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
      const newRefreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict",
      });

      return res.json({
        status: "OK",
        message: "Success",
        accessToken: accessToken,
      });
    });
  },

  userLogout: async (req, res) => {
    res.clearCookie("refreshToken");
    res.json({
      status: "OK",
      message: "Logged out!",
    });
  },
};

module.exports = userController;
