const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const genPassword = require("../lib/passportUtils").genPassword;

// get new user register
exports.getRegisterUser = asyncHandler(async (req, res) => {
  res.json({ message: "GET REGISTER NEW USER NOT IMPLEMENTED" });
});

// register data send
exports.postRegisterUser = [
  body("username", "Username must be at least 3 characters long")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("password", "Password must be at least 3 characters long")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const prisma = new PrismaClient();

    if (!errors.isEmpty) {
      console.log(errors);
      res.json(errors);
    }

    try {
      // check whether user exists
      const user = await prisma.User.findFirst({
        where: {
          username: req.body.username,
        },
      });

      if (user == null) {
        // user does not exist, we can create a new user!
        console.log("User does not exist");
        const hash = await genPassword(req.body.password);

        await prisma.User.create({
          data: {
            username: req.body.username,
            hash: hash,
          },
        });
        return res.json({ message: "User created successfully" });
      } else {
        // user exists, we cannot create a new user
        return res.json(user, {
          message: "User already exists we cannot create it again!",
        });
      }
    } catch (error) {
      next(error);
    }
  }),
];

// get new user login
exports.getLoginUser = asyncHandler(async (req, res) => {
  res.json({ message: "GET LOGIN NOT IMPLEMENTED" });
});

// post NEW USER LOGIN
exports.postLoginUser = asyncHandler(async (req, res) => {
  console.log("Req body: ");
  console.log(req.body);
  res.json({ message: "POST LOGIN NOT IMPLEMENTED" });
});

// get user profile
exports.getUserProfile = asyncHandler(async (req, res) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    where: {
      id: +req.params.id,
    },
  });
  res.json(user);
  // res.json({ message: `GET USER PROFILE ${req.params.id}` });
});
