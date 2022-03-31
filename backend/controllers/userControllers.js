const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// asyncHandler is going to handle all the errors that happen in the application

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body; // for our user to login we will need our email and password from the req.body submit POST

	console.log(
		"\nIn function backend> authUser: " +
			JSON.stringify({ email, password })
	);

	const user = await User.findOne({ email: email.toLowerCase() });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			pic: user.pic,
			token: generateToken(user._id),
			success: true,
			message: "User Authenticated Successfully",
		});
	} else {
		res.status(401);
		throw new Error(`Invalid email or password!`);
	}
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, pic } = req.body;

	console.log(
		"\nIn function backend> registerUser: " +
			JSON.stringify({ name, email, password, pic })
	);

	const userExists = await User.findOne({ email: email.toLowerCase() });

	if (userExists) {
		res.status(404);
		throw new Error(`User ${name} already exists`);
	}

	const user = await User.create({
		name,
		email: email.toLowerCase(),
		password,
		pic,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			pic: user.pic,
			token: generateToken(user._id),
			success: true,
			message: "User Created/Registered Successfully",
		});
	} else {
		res.status(400);
		throw new Error(`User ${name} not Created/Registered`);
	}

	//}
	// res.json({
	// 	name: name,
	// 	email: email,
	// });
	// IS THE SAME AS:
	// res.json({
	// 	name,
	// 	email,
	// });
});

module.exports = { registerUser, authUser };
