const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validaeFeedbackInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 8, max: 300 })) {
    errors.text = "Feedback must be between 8 & 300 caract";
  }
  if (validator.isEmpty(data.text)) {
    errors.text = "Text  field is Required !";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
