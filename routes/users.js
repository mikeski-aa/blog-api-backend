const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
require("../config/passport");
const { PrismaClient, Prisma } = require("@prisma/client");

// get register from for a new user
router.get("/register", userController.getRegisterUser);

// post a register form for a new user
router.post("/register", userController.postRegisterUser);

// login get form
router.get("/login", userController.getLoginUser);

// login POST form
router.post("/login", userController.postLoginUser);

// testing
router.get("/profile/", async (req, res, next) => {
  return res.json({ message: "i work" });
});

// get user profile
router.get("/:id", userController.getUserProfile);

// get user profile
// router.post(
//   "/profile/",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res, next) => {
//     const prisma = new PrismaClient();
//     try {
//       // check if user exists
//       const userExists = await prisma.user.findFirst({
//         where: {
//           username: req.body.username,
//         },
//       });
//       if (!userExists)
//         return res.status(400).json({ message: "user does not exist" });

//       return res
//         .status(200)
//         .json({ userId: userExists.id, username: userExists.username });
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   }
// );

module.exports = router;
