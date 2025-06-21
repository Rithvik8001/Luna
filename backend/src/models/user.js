const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 1,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      trim: true,
      maxLength: 60,
    },
    age: {
      type: Number,
      min: 18,
      trim: true,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["Male", "Female", "Others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Not a valid address");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://github.com/shadcn.png",
      trim: true,
    },
    about: {
      type: String,
      default: "Please describe about yourself.",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJwt = function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: "7d",
    },
  );
  return token;
};

userSchema.methods.validatePassword = async function (userPasswordInput) {
  const user = this;
  const hashedPassword = user.password;
  const isPasswordValid = await bcrypt.compare(
    userPasswordInput,
    hashedPassword,
  );
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
