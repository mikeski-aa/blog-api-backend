var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/register", function (req, res, next) {
  const user = {
    id: 1,
    name: "mike",
  };
  res.json(req.body);
});

router.post("/new", function (req, res, next) {
  res.send("send register form, create user");
});

module.exports = router;
