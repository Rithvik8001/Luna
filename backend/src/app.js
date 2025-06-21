require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { connectDb } = require("./config/database");
const { User } = require("./models/user");
const { validateSignUpData } = require("./validations/signUpValidation");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Invalid User.");
    }
    res.status(200).json({
      data: user,
      message: "User successfully fetched",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

connectDb().then(() => {
  console.log("DB Successfully connected");
  app.listen(process.env.PORT, () => {
    console.log("Server is successfully listening");
  });
});
