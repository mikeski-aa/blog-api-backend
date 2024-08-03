const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

// get user profile
exports.getUserProfile = asyncHandler(async (req, res) => {
  res.send(`GET USER PROFILE ${req.params.id}`);
});

// get new user register
exports.getRegisterUser = asyncHandler(async (req, res) => {
  res.send("GET REGISTER NEW USER NOT IMPLEMENTED");
});

// register data send
exports.postRegisterUser = asyncHandler(async (req, res) => {
  res.send("POST REGISTER USER NOT IMPLEMENTED");
});

// get new user login
exports.getLoginUser = asyncHandler(async (req, res) => {
  res.send("GET LOGIN NOT IMPLEMENTED");
});

// post NEW USER LOGIN
exports.postLoginUser = asyncHandler(async (req, res) => {
  res.send("POST LOGIN NOT IMPLEMENTED");
});
