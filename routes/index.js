var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "RENDER INDEX NOT IMPLEMENTED" });
});

// test if authenticate works
router.get(
  "/logincheck",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    if (!req.user) {
      res.json({
        username: "#FAILED#",
      });
    }

    res.json({
      username: req.user.username,
    });
  }
);

module.exports = router;
