const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../validations/signUpValidation");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    const validationResult = validateSignUpData(req.body);
    if (!validationResult.valid) {
      return res.status(400).json({ error: validationResult.error });
    }
    const { firstName, lastName, emailId, password } = req.body;
    // password encryption
    const hashedPassword = await bcrypt.hash(password, 10);
    // check if user already exists
    const existingUser = await User.findOne({ emailId: emailId });
    if (existingUser) {
      return res.status(401).json("Email already registered.");
    }
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json("User is succesfully created");
  } catch (err) {
    res.status(404).json(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({
      emailId: emailId,
    });
    if (!user) {
      throw new Error("cannot find the email.");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Password is not valid");
    }
    const token = await user.getJwt();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.status(200).json({
      message: "Login Successful.",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({
        message: "Logout successful.",
      });
  } catch (err) {}
});

module.exports = {
  authRouter,
};
