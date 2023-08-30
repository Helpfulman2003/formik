const jwt = require("jsonwebtoken");

const middlewareController = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      //Bearer ababakdsjka
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
          return res.status(403).json({
            status: "ERROR",
            message: "Token is not valid",
          });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({
        message: "You are not athenticated",
      });
    }
  },

  verifyTokenAdmin: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not allowed to delete other");
      }
    });
  },
};

module.exports = middlewareController;
