const express = require("express");
const app = express();
const dotenv = require("dotenv");
const notes = require("./data/notes");

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // this is the new version that includes bodyparser, means the server can accept JSON in the body of the request for example a GET or POST

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/api/notes", (req, res) => {
	res.json(notes);
	res.end();
});

app.get("/api/notes/:id", (req, res) => {
	// const note = notes.find((n) => n._id === req.params.id);
	const note = notes.find((n) => {
		if (n._id === req.params.id) {
			return n;
		}
	});
	console.log(note);
	res.json(note);
});

app.listen(PORT, () => {
	console.log(`Backend Server started, listening on port ${PORT}`);
});
