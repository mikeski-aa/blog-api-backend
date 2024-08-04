const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

// get user profile
exports.getUserProfile = asyncHandler(async (req, res) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    where: {
      username: "Mike",
    },
  });
  res.json(user);
  // res.json({ message: `GET USER PROFILE ${req.params.id}` });
});

// get new user register
exports.getRegisterUser = asyncHandler(async (req, res) => {
  res.json({ message: "GET REGISTER NEW USER NOT IMPLEMENTED" });
});

// register data send
exports.postRegisterUser = asyncHandler(async (req, res) => {
  res.json({ message: "POST REGISTER USER NOT IMPLEMENTED" });
});

// get new user login
exports.getLoginUser = asyncHandler(async (req, res) => {
  res.json({ message: "GET LOGIN NOT IMPLEMENTED" });
});

// post NEW USER LOGIN
exports.postLoginUser = asyncHandler(async (req, res) => {
  res.json({ message: "POST LOGIN NOT IMPLEMENTED" });
});
