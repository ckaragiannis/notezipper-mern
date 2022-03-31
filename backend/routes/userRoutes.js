const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser); // the post part is the userController link function tp call
router.route("/login").post(authUser); // the post part is the userController link function to call

module.exports = router;
