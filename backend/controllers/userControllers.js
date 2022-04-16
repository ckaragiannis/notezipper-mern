const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const ethers = require("ethers");
const wallet = require("./utils/wallet");
const provider = require("./utils/provider");
const { address, abi } = require("./utils/config");

// asyncHandler is going to handle all the errors that happen in the application

//@description     Get 10 more GimmeSome ethers
//@route           GET /api/users/mintMoreUsdc
//@access          Public
const mintMoreUsdc = asyncHandler(async (req, res) => {
	const { senderAddress } = req.body; // for our user to login we will need our email and password from the req.body submit POST

	console.log("SENDER ADDRESS IS : ", senderAddress);
	// console.log("RECEIVER ADDRESS IS : ", receiverAddress);
	// console.log("TRANSFER AMOUNT IS : ", amount);

	const account = wallet.connect(provider);

	const usdc = new ethers.Contract(address, abi, account);

	try {
		const tx = await usdc.gimmeSome({ gasPrice: 20e9 });
		console.log(`Transaction hash: ${tx.hash}`);

		const receipt = await tx.wait();
		console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
		console.log(`Gas used: ${receipt.gasUsed.toString()}`);

		res.json({
			txHash: tx.hash,
			amountAdded: "10",
			blockNumber: receipt.blockNumber,
			txGasUsed: receipt.gasUsed.toString(),
		});
	} catch (err) {
		res.status(401);
		throw new Error(`Unable to mint more USDC, please try later`);
	}
});

//@description     Get USDC Balance
//@route           GET /api/users/usdcBalance
//@access          Public
const transferUsdc = asyncHandler(async (req, res) => {
	const { senderAddress, receiverAddress, amount } = req.body; // for our user to login we will need our email and password from the req.body submit POST

	console.log("SENDER ADDRESS IS : ", senderAddress);
	console.log("RECEIVER ADDRESS IS : ", receiverAddress);
	console.log("TRANSFER AMOUNT IS : ", amount);

	const account = wallet.connect(provider);

	const usdc = new ethers.Contract(address, abi, account);

	let to, value;
	try {
		to = ethers.utils.getAddress(receiverAddress);
	} catch (err) {
		res.status(401);
		throw new Error(
			`Invalid recipient of the tokens address: ${receiverAddress}`
		);
	}

	try {
		value = ethers.utils.parseUnits(amount, 6);
		console.log("Value to transfer: ", value);
		if (value.isNegative()) {
			res.status(401);
			throw new Error(
				`Cannot have a negative amount to transfer/ Invalid amount ${amount}`
			);
		}
	} catch (err) {
		res.status(401);
		throw new Error(
			`Cannot have a negative amount to transfer/ Invalid amount ${amount}`
		);
	}

	const balanceOfTokens = await usdc.balanceOf(account.address);
	if (balanceOfTokens.lt(value)) {
		const valueFormatted = ethers.utils.formatUnits(value, 6);
		const balanceFormatted = ethers.utils.formatUnits(balanceOfTokens, 6);
		res.status(401);
		throw new Error(
			`Insufficient balance to send ${valueFormatted}, (you only have ${balanceFormatted})`
		);
	}

	const tx = await usdc.transfer(to, value, { gasPrice: 20e9 });
	console.log(`Transaction Hash: ${tx.hash}`);

	const txReceipt = await tx.wait();
	console.log(
		`Transaction confirmed in Block Number: ${txReceipt.blockNumber}`
	);

	res.json({
		senderAddress: senderAddress,
		receiverAddress: receiverAddress,
		txHash: tx.hash,
		amount: amount,
		blockNumber: txReceipt.blockNumber,
		txReceipt: txReceipt,
	});
});

//@description     Get USDC Balance
//@route           GET /api/users/usdcBalance
//@access          Public
const getUsdcBalance = asyncHandler(async (req, res) => {
	// const { senderAddress } = req.body; // for our user to login we will need our email and password from the req.body submit POST

	// console.log("SENDER ADDRESS IS : ", senderAddress);
	// try {
	const account = wallet.connect(provider); // connect to the Ethereum BlockChain
	const usdc = new ethers.Contract(address, abi, account);
	const usdcBalance = await usdc.balanceOf(account.address);
	console.log(usdcBalance.toString());
	console.log(`USDC balance: ${ethers.utils.formatUnits(usdcBalance, 6)}`); // six decimal points for usdc and for most other tokens including ether itll be 18
	res.json({
		address: account.address,
		usdcBalance: ethers.utils.formatUnits(usdcBalance, 6),
	});
	// console.log("IAMAMAMHERE");
	// } catch (err) {
	// 	res.status(401);
	// 	throw new Error(`Error retrieving the USDC Balance of account`);
	// }
});

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

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	console.log(user);
	if (user._id.toString() !== req.user._id.toString()) {
		throw new Error("You can't perform this action!");
	}

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.pic = req.body.pic || user.pic;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		console.log("updateUserProfile()->updatedUser is: ");
		console.log(updatedUser);

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			pic: updatedUser.pic,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error("User not found to update");
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

module.exports = {
	registerUser,
	authUser,
	updateUserProfile,
	getUsdcBalance,
	transferUsdc,
	mintMoreUsdc,
};
