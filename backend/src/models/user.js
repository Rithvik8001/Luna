const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  emailId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: Number,
  gender: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
