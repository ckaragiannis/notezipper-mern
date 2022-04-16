const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const { protect } = require("../middlewares/authMiddleware");

// @desc    Get logged in user notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
	const notes = await Note.find({ user: req.user._id });
	res.json(notes);
});

//@description     Create single Note
//@route           GET /api/notes/create
//@access          Private
const createNote = asyncHandler(async (req, res) => {
	const { title, content, category } = req.body;

	if (!title || !content || !category) {
		res.status(400);
		throw new Error("Please fill all the fields!");
	} else {
		// Use this method:
		// const note = new Note({ user: req.user._id, title, content, category }); // create a new Note from our noteModel->Note.noteschema
		// const createdNote = await note.save();

		// Or, you could just use this method, both work just fine at creating a new document in the collection (SQL new row in the table)
		const note = await Note.create({
			user: req.user._id,
			title,
			content,
			category,
		});

		res.status(201).json(note);
	}
});

//@description     Fetch single Note
//@route           GET /api/notes/:id
//@access          Public
const getNoteById = asyncHandler(async (req, res) => {
	const note = await Note.findById(req.params.id);
	if (note) {
		res.json(note);
	} else {
		res.status(404).json({ message: "Note not found!!!" });
	}
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
	const { title, content, category } = req.body;

	const note = await Note.findById(req.params.id);

	if (note.user.toString() !== req.user._id.toString()) {
		throw new Error("You can't perform this action!");
	}

	if (note) {
		note.title = title;
		note.content = content;
		note.category = category;

		const updatedNote = await note.save(note);
		res.json(updatedNote);
	} else {
		throw new Error("Note not found to update");
	}
});

//@description     Delete single Note
//@route           GET /api/notes/:id
//@access          Private
const deleteNote = asyncHandler(async (req, res) => {
	const note = await Note.findById(req.params.id);

	if (note.user.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error("Logged in user can't perform this action");
	}

	if (note) {
		await note.remove();
		res.json({ message: "Note deleted successfully" });
	} else {
		res.status(404);
		throw new Error("Note not found to delete");
	}
});

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
