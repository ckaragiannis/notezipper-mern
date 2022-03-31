const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		pic: {
			type: String,
			required: true,
			default:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
	console.log(
		"\nIN backend> matchPassword function and the password to match are:\nEntered Password: " +
			enteredPassword +
			"\nthis.password is: " +
			this.password
	);
	return await bcrypt.compare(enteredPassword, this.password); // this.password will be the password that'll be coming from out database
};

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
	// userSchema.pre means previous of "saving" operation, before it saves the data for POST/UPDATE and so what do we do, call a function middleware (next)
	console.log("\nPASSWORD IN userSchema.Pre is: " + this.password);
	if (!this.isModified("password")) {
		// if the password was not modified, then just move on: next(), otherwise bcrypt the this.password
		next();
	}
	const salt = await bcrypt.genSalt(10); // the more higher the value 10 the more encrypted it is
	this.password = await bcrypt.hash(this.password, salt);
	console.log(
		"\nPASSWORD IN userSchema.Pre after BCrypt is now: " + this.password
	);
});

// The line: mongoose.model('Users', UserSchema); registers our schema with mongoose. Our user model can then be accessed anywhere in our application by calling mongoose.

// const User = mongoose.model("Users", userSchema);            // "Users is the name of the table created in the .env myFirstData database"
// OR USE THIS NEXT WAY (MORE COMPACT), as you are exporting the User variable
module.exports = User = mongoose.model("Users", userSchema); // "Users is the name of the table created in the .env myFirstData database"
