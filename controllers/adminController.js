const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

// get all posts for admin request
exports.getAdminPosts = asyncHandler(async (req, res) => {
  console.log(req.body);
  const prisma = new PrismaClient();
  const posts = await prisma.Post.findMany({
    include: {
      user: true,
      comments: true,
    },
  });
  res.json({ posts });
});

// login controller
exports.adminLogin = asyncHandler(async (req, res, next) => {
  // user was authenticated by passport, before we issue a tokenhowever, we need to check that the user is an admin!
  if (req.user.isadmin != true) {
    return res.json({ message: "You are not authorized to view this page" });
  }
  console.log(req.body.username);
  const token = jwt.sign({ username: req.body.username }, "secret", {
    expiresIn: "12h",
  });

  console.log("auth good, lets go");
  return res.json({ token: token, isadmin: req.user.isadmin });
});

// delete post and comments controller
exports.adminDeletePost = asyncHandler(async (req, res, next) => {
  console.log("test");
  console.log(req.params.id);
  const prisma = new PrismaClient();
  if (!req.params.id) {
    return res.json({ message: "ID is missing" });
  }

  try {
    // convert req.params to number from string!
    await prisma.comment.deleteMany({ where: { postId: +req.params.id } });
    console.log("comments deleted");
    await prisma.post.delete({ where: { id: +req.params.id } });
    console.log("post deleted");
    return res.json({ message: "delete successful" });
  } catch (error) {
    next(error);
  }
});

// update
exports.adminPutPublish = asyncHandler(async (req, res, next) => {
  console.log("test");
  const prisma = new PrismaClient();
  console.log(req.query.id);
  console.log(req.query.state);
  res.json({ message: "working" });
});
