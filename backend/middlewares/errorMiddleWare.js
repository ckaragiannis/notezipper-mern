const notFound = (req, res, next) => {
	// error handler for route not found
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error); // move on to next
};

const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

module.exports = { notFound, errorHandler };
