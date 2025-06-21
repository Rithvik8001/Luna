const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { User } = require("../models/user");
const { validateProfileData } = require("../validations/profileUpdate");
const bcrypt = require("bcrypt");
const { updatePasswordValidation } = require("../validations/updatePassword");

profileRouter.get("/profile", userAuth, async (req, res) => {
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

// update password
profileRouter.patch("/profile/updatePassword", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;

    if (!user) {
      throw new Error("Invalid User");
    }
    const isValid = updatePasswordValidation(req);
    if (!isValid) {
      return;
    }

    const verifyOldPassword = await bcrypt.compare(oldPassword, user.password);

    if (!verifyOldPassword) {
      throw new Error("Invalid Password");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update password
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    if (!updatedUser) {
      throw new Error("Failed to update password");
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully! 🎉",
      data: updatedUser,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

// update profile
profileRouter.patch("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const updateInfo = req.body;

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    // Check if request body is empty
    if (Object.keys(updateInfo).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update data provided",
      });
    }

    // Validate the update data
    validateProfileData(updateInfo);

    // Trim string fields
    const sanitizedUpdate = {};
    Object.keys(updateInfo).forEach((key) => {
      if (typeof updateInfo[key] === "string") {
        sanitizedUpdate[key] = updateInfo[key].trim();
      } else {
        sanitizedUpdate[key] = updateInfo[key];
      }
    });

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      sanitizedUpdate,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully! 🎉",
      data: updatedUser,
    });
  } catch (err) {
    const statusCode =
      err.message.includes("validation") ||
      err.message.includes("should be") ||
      err.message.includes("Invalid")
        ? 400
        : 500;

    res.status(statusCode).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = {
  profileRouter,
};
