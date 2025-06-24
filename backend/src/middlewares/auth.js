const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Please Login.");
    }
    const decodedMessage = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found.");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

module.exports = {
  userAuth,
};
