const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const passport = require("passport");
const isAdmin = require("../routes/Authmiddleware").isAdmin;
const jwt = require("jsonwebtoken");

//test
router.get("/", (req, res) => {
  res.send("working");
});

// admin login
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  adminController.adminLogin
);

// get all posts for admin route
router.get(
  "/posts",
  passport.authenticate("jwt", {
    session: false,
  }),
  isAdmin,
  adminController.getAdminPosts
);

// delete post and
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  isAdmin,
  adminController.adminDeletePost
);

// update post publish
router.put(
  "/publish",
  passport.authenticate("jwt", {
    session: false,
  }),
  isAdmin,
  adminController.adminPutPublish
);

// update post text
router.put(
  "/editpost",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  adminController.adminUpdatePost
);

// get comments
router.post(
  "/addnew",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  adminController.adminPostNew
);
// delete comment

module.exports = router;
