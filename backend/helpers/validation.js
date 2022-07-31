const { check, validationResult } = require("express-validator");

// Validation Check
const validationCheck = (req, res, next) => {
  const errors = validationResult(req).array();

  if (!errors.length) return next();

  res.status(400);
  throw new Error(errors[0].msg);
};

// Register Data Validation
const validateRegisterData = [
  check("name").trim().not().isEmpty().withMessage("Name is required!"),
  check("email").normalizeEmail().isEmail().withMessage("Invalid Email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long!"),
];

// Login Data Validation
const validateLoginData = [
  check("email").normalizeEmail().isEmail().withMessage("Invalid Email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long!"),
];

// Appointment Data Validation
const validateAppointData = [
  check("appointTitle")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Appointment title is required!"),
  check("appointAgenda")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Appointment Agenda is required!"),
  check("appointTime")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Appointment time is required!"),
];

module.exports = {
  validationCheck,
  validateRegisterData,
  validateLoginData,
  validateAppointData,
};