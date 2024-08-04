const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
require("../config/passport");
const { PrismaClient, Prisma } = require("@prisma/client");
const jwt = require("jsonwebtoken");

// get register from for a new user
router.get("/register", userController.getRegisterUser);

// post a register form for a new user
router.post("/register", userController.postRegisterUser);

// login get form
router.get("/login", userController.getLoginUser);

// login POST form
// router.post("/login", userController.postLoginUser);

// try out another thing
router.post(
  "/login",
  passport.authenticate("local", {
    session: false,
  }),
  (req, res) => {
    // Token
    console.log("test");
    console.log(req.body.username);
    const token = jwt.sign({ username: req.body.username }, "secret", {
      expiresIn: "1d",
    });

    return res.json({ token: token });
  }
);

// // testing
// router.get("/profile/", verifyToken, async (req, res, next) => {
//   console.log(req.token);
//   return res.json({ message: "i work" });
// });

// //verify token function
// function verifyToken(req, res, next) {
//   // get the auth header value
//   // when we get our token we want to send it in header
//   const bearerHeader = req.headers["authorization"];
//   // check if bearer is undefined
//   if (typeof bearerHeader !== "undefined") {
//     // continue
//     // split at the space
//     const bearer = bearerHeader.split(" ");
//     // get token from array
//     const bearerToken = bearer[1];
//     // set token
//     req.token = bearerToken;
//     next();
//   } else {
//     // forbidden

//     res.sendStatus(403);
//   }
// }

// get user profile
router.post("/profile/", async (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/",
  })(req, res);
});

// get user profile
router.get("/profile/:id", userController.getUserProfile);

module.exports = router;
