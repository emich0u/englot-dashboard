const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validaeProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.adress = !isEmpty(data.adress) ? data.adress : "";
  data.tell = !isEmpty(data.tell) ? data.tell : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle need to between 2 and 40 characters";
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required ";
  }
  if (validator.isEmpty(data.adress)) {
    errors.adress = "Adress is required ";
  }

  if (validator.isEmpty(data.tell)) {
    errors.tell = " Telephone required ";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
