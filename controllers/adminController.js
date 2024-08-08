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
    orderBy: [
      {
        id: "asc",
      },
    ],
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

// update publish state
exports.adminPutPublish = asyncHandler(async (req, res, next) => {
  const prisma = new PrismaClient();
  let published;

  // whatever is supplied by the query, do the reverse, as we are toggling the published status
  if (req.query.state == "true") {
    published = false;
  } else {
    published = true;
  }
  console.log(req.query.id);
  console.log(req.query.state);
  try {
    await prisma.post.update({
      where: {
        id: +req.query.id,
      },
      data: {
        published: published,
      },
    });

    res.json({ message: "Published status updated successfully" });
  } catch (error) {
    next(error);
  }
});

// update post content
exports.adminUpdatePost = [
  body("newtext").isLength({ min: 1 }).escape(),
  body("newtitle").isLength({ min: 1 }).escape(),
  body("id").trim().escape(),

  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    const prisma = new PrismaClient();
    if (!req.body.newtext || !req.body.newtitle || !req.body.id) {
      return res.json({ message: "items missing" });
    }

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    try {
      await prisma.post.update({
        where: {
          id: +req.body.id,
        },
        data: {
          title: req.body.newtitle,
          text: req.body.newtext,
        },
      });

      return res.json({ message: "Post updated" });
    } catch (error) {
      next(error);
    }
  }),
];

// post new post
exports.adminPostNew = [
  body("title").isLength({ min: 1 }).escape(),
  body("text").isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    console.log("test");
    const errors = validationResult(req);
    const prisma = new PrismaClient();
    console.log(req.user.id);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    if (!req.body.title || !req.body.text) {
      return res.json({ message: "items missing" });
    }
    console.log("dddddd");
    await prisma.post.create({
      data: {
        userId: +req.user.id,
        title: req.body.title,
        text: req.body.text,
        date: new Date(),
        published: false,
      },
    });

    res.json({ message: "New post created" });
  }),
];
