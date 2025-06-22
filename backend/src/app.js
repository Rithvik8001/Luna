require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { connectDb } = require("./config/database");
const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestsRouter } = require("./routes/requests");
const { userRouter } = require("./routes/user");
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/", userRouter);

connectDb().then(() => {
  console.log("DB Successfully connected");
  app.listen(process.env.PORT, () => {
    console.log("Server is successfully listening");
  });
});
