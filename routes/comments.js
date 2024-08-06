const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// get all comments route
router.get("/", commentController.getAllComments);

// get comment by ID
router.get("/:id", commentController.getCommentsForPost);

// post new comment
router.post("/new", commentController.postComment);

module.exports = router;
