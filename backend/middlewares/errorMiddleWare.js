const notFound = (req, res, next) => {
	// error handler for route not found
	// console.log("IN notFOUND ERROR HANDLER");
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error); // move on to next
};

const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	// console.log("IN errorHandler ERROR HANDLER: " + err.stack);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

module.exports = { notFound, errorHandler };
