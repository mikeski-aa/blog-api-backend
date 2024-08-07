const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const isAdmin = require("./Authmiddleware").isAdmin;
const passport = require("passport");

// get posts
router.get("/", postController.getAllPosts);

// get all posts for admin route
router.get(
  "/adminposts",
  passport.authenticate("jwt", {
    session: false,
  }),
  isAdmin,
  postController.getAdminPosts
);

// create new post page
router.get("/new", postController.getNewPost);

// submit a new post
router.post("/new", postController.postNewPost);

// get a specific post
router.get("/:id", postController.getPostById);

// update specific post
router.put("/:id", postController.updatePostById);

// delete specific post
router.delete("/:id", postController.deletePostById);

module.exports = router;
