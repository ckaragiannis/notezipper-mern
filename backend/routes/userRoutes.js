const express = require("express");
const {
	registerUser,
	authUser,
	updateUserProfile,
	getUsdcBalance,
	transferUsdc,
	mintMoreUsdc,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser); // the post part is the userController link function tp call
router.route("/login").post(authUser); // the post part is the userController link function to call
router.route("/profile").post(protect, updateUserProfile);
router.route("/usdcBalance").get(protect, getUsdcBalance);
router.route("/transferUsdc").post(protect, transferUsdc);
router.route("/mintMoreUsdc").post(protect, mintMoreUsdc);

module.exports = router;
