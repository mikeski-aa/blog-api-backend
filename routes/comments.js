const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// get all comments route
router.get("/", commentController.getAllComments);

router.get("/:id", commentController.getCommentsForPost);

module.exports = router;
