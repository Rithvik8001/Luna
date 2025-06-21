const validator = require("validator");

const validateProfileData = (data) => {
  const allowedUpdates = [
    "firstName",
    "lastName",
    "age",
    "photoUrl",
    "about",
    "skills",
    "gender",
  ];

  const requestedUpdates = Object.keys(data);

  // Check if all requested updates are allowed
  const isValidOperation = requestedUpdates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    throw new Error("Invalid update fields provided");
  }

  // Validate individual fields only if they exist
  if (data.firstName !== undefined) {
    if (
      typeof data.firstName !== "string" ||
      data.firstName.trim().length < 4 ||
      data.firstName.trim().length > 50
    ) {
      throw new Error(
        "firstName should be a string between 4 and 50 characters"
      );
    }
  }

  if (data.lastName !== undefined) {
    if (
      typeof data.lastName !== "string" ||
      data.lastName.trim().length < 4 ||
      data.lastName.trim().length > 50
    ) {
      throw new Error(
        "lastName should be a string between 4 and 50 characters"
      );
    }
  }

  if (data.age !== undefined) {
    if (!Number.isInteger(data.age) || data.age < 18 || data.age > 60) {
      throw new Error("Age should be an integer between 18 and 60");
    }
  }

  if (data.photoUrl !== undefined) {
    if (typeof data.photoUrl !== "string" || !validator.isURL(data.photoUrl)) {
      throw new Error("Invalid photo URL provided");
    }
  }

  if (data.skills !== undefined) {
    if (!Array.isArray(data.skills)) {
      throw new Error("Skills should be an array");
    }
    if (data.skills.length > 10) {
      throw new Error("Cannot add more than 10 skills");
    }
    // Validate each skill is a non-empty string
    const invalidSkills = data.skills.filter(
      (skill) => typeof skill !== "string" || skill.trim().length === 0
    );
    if (invalidSkills.length > 0) {
      throw new Error("All skills should be non-empty strings");
    }
  }

  if (data.about !== undefined) {
    if (typeof data.about !== "string" || data.about.trim().length > 500) {
      throw new Error(
        "About section should be a string with maximum 500 characters"
      );
    }
  }

  if (data.gender !== undefined) {
    const validGenders = ["male", "female", "other", "prefer-not-to-say"];
    if (!validGenders.includes(data.gender.toLowerCase())) {
      throw new Error(
        "Gender should be one of: male, female, other, prefer-not-to-say"
      );
    }
  }

  return true;
};

module.exports = {
  validateProfileData,
};
