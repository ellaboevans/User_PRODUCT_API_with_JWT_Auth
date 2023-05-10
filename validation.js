// VALIDATION
const Joi = require("joi");

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// Login Validation

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// // Product Validation
// const productValidation = (data) => {
//   const schema = Joi.object({
//     name: Joi.string().min(6).required(),
//     price: Joi.number().required(),
//     quantity: Joi.number().required(),
//     description: Joi.string().min(255).required(),
//   });
//   return schema.validate(data);
// };

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
// module.exports.productValidation = productValidation;
