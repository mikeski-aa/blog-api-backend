const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const expressAsyncHandler = require("express-async-handler");

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

exports.postComment = [
  body("comment").trim().isLength({ min: 1 }).escape(),
  body("id").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req.body);
    const prisma = new PrismaClient();

    console.log("Checking if everything is being passed correctly");
    console.log(req.body.comment);
    console.log(req.user.id);
    console.log(req.body.postId);

    if (!errors.isEmpty) {
      // return error if errors are encountered
      return res.json(errors);
    }

    if (
      typeof req.body.comment == "undefined" ||
      req.body.comment == null ||
      req.body.id == null ||
      typeof req.body.id === "undefined"
    ) {
      // missing body
      console.log("null body");
      return res.json("null body");
    }

    try {
      await prisma.comment.create({
        data: {
          userId: req.user.id,
          postId: req.body.postId,
          text: req.body.comment,
          date: new Date(),
        },
      });
      return res.json("saved successful");
    } catch (error) {
      next(error);
    }
  }),
];

// get all comments for a specific post via req.params.id
// validation for req params id should be added.
exports.getCommentsForPost = asyncHandler(async (req, res, next) => {
  const prisma = new PrismaClient();
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: +req.params.id,
      },
      include: {
        user: true,
      },
    });

    res.json(comments);
  } catch (error) {
    next(error);
  }
});
