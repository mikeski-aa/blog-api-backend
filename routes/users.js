var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

// get user profile
router.get("/:id", userController.getUserProfile);

// get register from for a new user
router.get("/register", userController.getRegisterUser);

// post a register form for a new user
router.post("/register", userController.postRegisterUser);

// login get form
router.get("/login", userController.getLoginUser);

// login POST form
router.post("/login", userController.postLoginUser);

module.exports = router;
