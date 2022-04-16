const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// This middleware protect function will get called before route GET /api/notes to
// make sure that the user is authenticated first before allowing someone
// to just query the notes without first being authenticated.  Otherwise
// it would be a big failure.
const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
		// Example Request Header below:
		// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDNjZTBkODE3YzBiMzg2ZGVhNjZmMSIsImlhdCI6MTY0ODg3MjQwMCwiZXhwIjoxNjUxNDY0NDAwfQ.TnaRfILeV3oJBsttNqR9lYhJ7edJ4lnNZFmjwILyu_g
		// Content-Type: application/json
		// User-Agent: PostmanRuntime/7.29.0
		// Accept: */*
		// Postman-Token: 79c08b7a-e573-4e23-bd38-f21c3b314c2b
		// Host: localhost:5000
		// Accept-Encoding: gzip, deflate, br
		// Connection: keep-alive
		// Content-Length: 147
		//
		// Example: Response Headers:
		// X-Powered-By: Express
		// Content-Type: application/json; charset=utf-8
		// Content-Length: 276
		// ETag: W/"114-cw/GwrGgskgMHK0ZsJ9Q0bXbcSA"
		// Date: Sat, 02 Apr 2022 05:42:35 GMT
		// Connection: keep-alive
		// Keep-Alive: timeout=5
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			//decodes token id
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log("In protect() middleware and the decoded token is: ");
			console.log(decoded);
			req.user = await User.findById(decoded.id).select("-password"); // find the decoded.id user._id and DONT send back the password into req.user
			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not authorized, token failed");
		}
	}

	if (!token) {
		res.status(401);
		throw new Error("Not authorized, no token");
	}
});

module.exports = { protect };
