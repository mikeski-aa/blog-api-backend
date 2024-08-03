var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "RENDER INDEX NOT IMPLEMENTED" });
});

module.exports = router;
