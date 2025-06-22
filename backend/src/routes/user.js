const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequests } = require("../models/connectionRequests");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequests.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "age",
      "about",
      "gender",
    ]);
    if (connectionRequests.length === 0) {
      throw new Error("No connection requests found.");
    }
    res.status(200).json({
      message: "Connection requests found.",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = {
  userRouter,
};
