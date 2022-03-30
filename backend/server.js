const express = require("express");
const app = express();
const dotenv = require("dotenv");
const notes = require("./data/notes");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleWare");

dotenv.config();
connectDB();

app.use(express.json()); // this is the new version that includes bodyparser, means the server can accept JSON in the body of the request for example a GET or POST

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/api/notes", (req, res) => {
	res.json(notes);
	res.end();
});

// Create a route
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// app.get("/api/notes/:id", (req, res) => {
// 	// const note = notes.find((n) => n._id === req.params.id);
// 	const note = notes.find((n) => {
// 		if (n._id === req.params.id) {
// 			return n;
// 		}
// 	});
// 	console.log(note);
// 	res.json(note);
// });

app.listen(PORT, () => {
	console.log(`Backend Server started, listening on port ${PORT}`);
});
