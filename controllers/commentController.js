const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

// get all comments
exports.getAllComments = asyncHandler(async (req, res, next) => {
  const prisma = new PrismaClient();
  try {
    const comments = await prisma.comment.findMany({});

    res.json(comments);
  } catch (error) {
    next(error);
  }
});

// get all comments for a specific post via req.params.id
exports.getCommentsForPost = asyncHandler(async (req, res, next) => {
  const prisma = new PrismaClient();
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: +req.params.id,
      },
    });

    res.json(comments);
  } catch (error) {
    next(error);
  }
});
