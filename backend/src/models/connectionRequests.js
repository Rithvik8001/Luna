const mongoose = require("mongoose");

const connectionRequestsSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      enum: {
        values: ["accepted,rejected,ignored,interested"],
        message: `{VALUE} is an incorrect status type`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ConnectionRequests = mongoose.model(
  "ConnectionRequests",
  connectionRequestsSchema
);

module.exports = {
  ConnectionRequests,
};
