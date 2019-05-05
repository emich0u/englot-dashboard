const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validaeResgisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name muste be between 2  ans 30 caratas";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is Required !";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is Required !";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid ";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required  ";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 chacracters  ";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password is required   ";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = " Password must match    ";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
