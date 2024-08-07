const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const isAuth = require("./Authmiddleware").isAuth;
const passport = require("passport");

// get all comments route
router.get("/", commentController.getAllComments);

// get comment by ID
router.get("/:id", commentController.getCommentsForPost);

// post new comment
// protected route with JWT
router.post(
  "/new",
  passport.authenticate("jwt", {
    session: false,
  }),
  commentController.postComment
);

module.exports = router;
