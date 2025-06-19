require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { connectDb } = require("./config/database");
const { User } = require("./models/user");
const { validateSignUpData } = require("./validations/signUpValidation");
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const validationResult = validateSignUpData(req.body);
    if (!validationResult.valid) {
      return res.status(400).json({ error: validationResult.error });
    }
    const { firstName, lastName, emailId, password } = req.body;

    // password encryption
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

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
    const userEmail = await User.findOne({
      emailId: emailId,
    });
    if (!userEmail) {
      throw new Error("cannot find the email.");
    }
    const isPasswordValid = await bcrypt.compare(password, userEmail.password);
    if (!isPasswordValid) {
      throw new Error("Password is not valid");
    }
    res.status(200).json({
      message: "Login Successful.",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

app.get("/user", async (req, res) => {
  const { emailId } = req.body;
  try {
    if (!emailId) {
      throw new Error("No Email id Provided");
    }
    const users = await User.find({ emailId: emailId });
    if (users.length === 0) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong.",
    });
  }
});

app.delete("/user", async (req, res) => {
  const { id } = req.body;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "User deleted successfully.",
    });
  } catch (err) {
    res.status(404).json({
      message: "Something went wrong",
    });
  }
});

app.patch("/user/:userId", async (req, res) => {
  const id = req.params.userId;
  const data = req.body;
  try {
    const allowedUpdates = [
      "skills",
      "photoUrl",
      "firstName",
      "lastName",
      "about",
      "age",
    ];
    const isUpdateAllowed = Object.keys(data).every((key) => {
      allowedUpdates.includes(key);
    });
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed.");
    }
    if (data?.skills.length > 10) {
      throw new Error("Cannot add more than 10 skills");
    }
    await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.status(200).json({
      message: "User details updated successfully.",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(404).json({
      message: "Something went wrong",
    });
  }
});

connectDb().then(() => {
  console.log("DB Successfully connected");
  app.listen(3000, () => {
    console.log("Server is successfuly listening on port 3000");
  });
});
