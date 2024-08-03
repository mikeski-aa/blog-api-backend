var express = require("express");
var router = express.Router();

// get posts
router.get("/", (req, res) => {
  res.send("LOAD POSTS");
});

// create new post page
router.get("/new", (req, res) => {
  res.send("CREATE A NEW POST");
});

// submit a new post
router.post("/new", (req, res) => {
  res.send("SUBMIT A NEW POST");
});

// get a specific post
router.get("/:id", (req, res) => {
  res.send(`pull up post of ID ${req.params.id}`);
});

// update specific post
router.put("/:id", (req, res) => {
  res.send("update specific id");
});

// delete specific post
router.delete("/:id", (req, res) => {
  res.json({ message: "delete this specifc ID" });
});

module.exports = router;
