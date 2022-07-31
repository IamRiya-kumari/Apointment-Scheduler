const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const getJwtToken = require("../helpers/getJwtToken");
const getHashPassword = require("../helpers/getHashPassword");
const checkPassword = require("../helpers/checkPassword");

// @desc Register a new user
// @route POST /v1/api/auth/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // Get the user from the request body
  const { name, email, password, isTeacher } = req.body;

  // Check if the user already exists
  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("Email already exists!");
  }

  // Create the user
  const newUser = await User.create({
    name,
    email,
    password: await getHashPassword(password),
    isTeacher,
  });

  // Sending response
  if (newUser) {
    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isTeacher: newUser.isTeacher,
        token: getJwtToken(newUser._id),
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid user data!");
  }
});

// @desc Login a user
// @route POST /v1/api/auth/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  // Get the user from the request body
  const { email, password } = req.body;

  // Check if the user already exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  // Check if the password is correct
  const isMatched = await checkPassword(password, user.password);

  //  If Password is incorrect
  if (!isMatched) {
    res.status(401);
    throw new Error("Incorrect Email or Password!");
  }

  // Sending response
  if (user) {
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isTeacher: user.isTeacher,
        token: getJwtToken(user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials!");
  }
});

module.exports = { registerUser, loginUser };