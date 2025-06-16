require("dotenv").config();

const express = require("express");
const app = express();
const { connectDb } = require("./config/database");
const { User } = require("./models/user");
app.use(express.json());

app.post("/signup", async (req, res) => {
  const userData = req.body;

  const user = new User(userData);
  try {
    await user.save();
    res.send("User is succesfully created");
  } catch (err) {
    res.send(err.message);
  }
});

app.get("/user", async (req, res) => {
  const { emailId } = req.body;
  try {
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

app.patch("/user", async (req, res) => {
  const { id } = req.body;
  const data = req.body;

  try {
    await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
    res.status(200).json({
      message: "User details updated successfully.",
    });
  } catch (err) {
    res.status(404).json({
      message: "Something went wrong.",
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
