const express = require("express");
const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequests } = require("../models/connectionRequests");

requestsRouter.post(
  "/requests/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const connectionRequest = new ConnectionRequests({
        fromUserId: fromUserId,
        toUserId: toUserId,
        status: status,
      });
      const data = await connectionRequest.save();
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);

module.exports = {
  requestsRouter,
};
