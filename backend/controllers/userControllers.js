const registerUser = async (req, res) => {
	const { name, email, password, pic } = req.body;
	// res.json({
	// 	name: name,
	// 	email: email,
	// });
	// IS THE SAME AS:
	res.json({
		name,
		email,
	});
};

module.exports = { registerUser };
