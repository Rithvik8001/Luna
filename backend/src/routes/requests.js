const express = require("express");
const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequests } = require("../models/connectionRequests");
const { User } = require("../models/user");

requestsRouter.post(
  "/requests/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      // check the connection type
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status");
      }

      // check to user
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User not found.");
      }
      // check existing conneciton req
      const existingConnectionRequest = await ConnectionRequests.findOne({
        $or: [
          { fromUserId, toUserId },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      if (existingConnectionRequest) {
        throw new Error("Connection already exists");
      }

      const connectionRequest = new ConnectionRequests({
        fromUserId: fromUserId,
        toUserId: toUserId,
        status: status,
      });
      const data = await connectionRequest.save();

      res.status(201).json({
        message: `${req.user.firstName} ${status} ${toUser.firstName} `,
        data: data,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);

requestsRouter.patch(
  "/requests/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status Type.");
      }
      const connectionRequest = await ConnectionRequests.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        throw new Error("Connection request not found.");
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.status(200).json({
        message: `Connection request is succesfully ${status}`,
        data: data,
      });
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
);

module.exports = {
  requestsRouter,
};
