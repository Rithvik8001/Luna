const validator = require("validator");

function validateSignUpData(data) {
  const { firstName, lastName, emailId, password } = data;

  if (!firstName || !lastName || !emailId || !password) {
    return { valid: false, error: "Missing required fields." };
  }

  if (!validator.isEmail(emailId)) {
    return { valid: false, error: "Email address is not valid." };
  }

  if (firstName.length < 4 || firstName.length > 50) {
    return {
      valid: false,
      error: "firstName should be between 4 and 50 characters.",
    };
  }

  if (lastName.length < 4 || lastName.length > 50) {
    return {
      valid: false,
      error: "lastName should be between 4 and 50 characters.",
    };
  }

  if (password.length < 6) {
    return {
      valid: false,
      error: "Password must be at least 6 characters long.",
    };
  }

  return { valid: true };
}

module.exports = { validateSignUpData };
