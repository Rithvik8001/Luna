const mongoose = require("mongoose");

const connectionRequestsSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["accepted", "rejected", "ignored", "interested"],
        message: "{VALUE} is an incorrect status type",
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestsSchema.index({
  fromUserId: 1,
  toUserId: 1,
});

// runs before the saving the connection request
connectionRequestsSchema.pre("save", function (next) {
  const connectionRequest = this;

  // check the fromUser is same as UserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send request to yourself.");
  }
  next();
});

const ConnectionRequests = mongoose.model(
  "ConnectionRequests",
  connectionRequestsSchema
);

module.exports = {
  ConnectionRequests,
};
