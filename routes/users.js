const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// get register from for a new user
router.get("/register", userController.getRegisterUser);

// post a register form for a new user
router.post("/register", userController.postRegisterUser);

// login get form
router.get("/login", userController.getLoginUser);

// login POST form
router.post("/login", userController.postLoginUser);

// get user profile
router.get("/:id", userController.getUserProfile);

module.exports = router;
