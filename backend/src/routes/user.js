const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequests } = require("../models/connectionRequests");
const userRouter = express.Router();

const userPopulateFeilds = [
  "firstName",
  "lastName",
  "gender",
  "age",
  "about",
  "photoUrl",
];
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequests.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", userPopulateFeilds);
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

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const findConnections = await ConnectionRequests.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", userPopulateFeilds);
    if (findConnections.length === 0) {
      throw new Error("No connection requests found.");
    }
    const data = findConnections.map((connection) => connection.fromUserId);
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      message: "Error occured",
    });
  }
});
module.exports = {
  userRouter,
};
