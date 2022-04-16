const express = require("express");
const {
	getNotes,
	createNote,
	getNoteById,
	updateNote,
	deleteNote,
} = require("../controllers/notesController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getNotes); // must first make sure the user token is authenticated (via authMiddleware) and then allowed to call getNotes
router.route("/create").post(protect, createNote);
router
	.route("/:id")
	.get(getNoteById)
	.put(protect, updateNote)
	.delete(protect, deleteNote);

module.exports = router;
