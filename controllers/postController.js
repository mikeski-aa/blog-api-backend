const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

// get all posts
exports.getAllPosts = asyncHandler(async (req, res) => {
  res.json({ message: "GET ALL POSTS NOT IMPLEMENTED" });
});

// create new post form
exports.getNewPost = asyncHandler(async (req, res) => {
  res.json({ message: "GET NEW POST FORM" });
});

// submit a new post
exports.postNewPost = asyncHandler(async (req, res) => {
  res.json({ message: "POST NEW POST NOT IMPLEMENTED" });
});

// GET A SPECIFIC POST BY ID
exports.getPostById = asyncHandler(async (req, res) => {
  res.json({ message: `GET POST BY ID ${req.params.id} NOT IMPLEMENTED` });
});

// UPDATE POST
exports.updatePostById = asyncHandler(async (req, res) => {
  res.json({ message: `UPDATE POST BY ID ${req.params.id} NOT IMPLEMENTED` });
});

// DELETE POST BY ID
exports.deletePostById = asyncHandler(async (reqs, res) => {
  res.json({ message: `DELETE POST BY ID ${req.params.id} NOT IMPLEMENTED` });
});
