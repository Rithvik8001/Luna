const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequests } = require("../models/connectionRequests");
const { User } = require("../models/user");
const userRouter = express.Router();

const userPopulateFeilds = [
  "firstName",
  "lastName",
  "gender",
  "age",
  "about",
  "photoUrl",
  "skills",
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
    })
      .populate("fromUserId", userPopulateFeilds)
      .populate("toUserId", userPopulateFeilds);
    if (findConnections.length === 0) {
      throw new Error("No connection requests found.");
    }
    const data = findConnections.map((connection) => {
      if (connection.fromUserId.toString() === loggedInUser._id.toString()) {
        return connection.toUserId;
      }
      return connection.fromUserId;
    });
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      message: "Error occured",
    });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // request pagination
    const page = req.query.page || 1;
    // limit is the number of users to fetch
    let limit = req.query.limit || 10;
    limit = limit > 50 ? 50 : limit;

    // skip is the number of users to skip
    const skip = (page - 1) * limit;

    if (!page || !limit) {
      throw new Error("Page and limit are required.");
    }

    // get all the connections of the logged in user
    const connectionRequests = await ConnectionRequests.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
        },
        { toUserId: loggedInUser._id },
      ],
    }).select(["fromUserId", "toUserId"]);

    // hide users from feed that are already in the connections of the logged in user
    const hideUsersFromFeed = new Set();

    connectionRequests.forEach((connection) => {
      hideUsersFromFeed.add(connection.fromUserId);
      hideUsersFromFeed.add(connection.toUserId);
    });

    // get all the users that are not in the connections of the logged in user
    const feedUsers = await User.find({
      $and: [
        {
          _id: {
            $nin: Array.from(hideUsersFromFeed),
          },
        },
        {
          _id: {
            $ne: loggedInUser._id,
          },
        },
      ],
    })
      .select(userPopulateFeilds)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Users fetched succesfully",
      data: feedUsers,
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
