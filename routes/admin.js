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

module.exports = router;
