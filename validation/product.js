const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validaeProductInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.prizeFourn = !isEmpty(data.prizeFourn) ? data.prizeFourn : "";
  data.prizeSell = !isEmpty(data.prizeSell) ? data.prizeSell : "";
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";

  if (!validator.isFloat(data.prizeFourn)) {
    errors.prizeFourn = "prizeFourn need to be a float ";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Product name is required ";
  }
  if (validator.isEmpty(data.category)) {
    errors.category = "category is required ";
  }

  if (validator.isEmpty(data.prizeFourn)) {
    errors.prizeFourn = " prizeFourn required ";
  }
  if (validator.isEmpty(data.prizeSell)) {
    errors.prizeSell = " prizeFourn required ";
  }
  if (validator.isEmpty(data.quantity)) {
    errors.quantity = " prizeFourn required ";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
