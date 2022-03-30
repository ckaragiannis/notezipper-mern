const express = require("express");
const { registerUser } = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser); // the post part is the controller link

module.exports = router;
