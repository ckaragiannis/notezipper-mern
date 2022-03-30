const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log(`Mongo DB conected successfully: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Mongo DB connection error: ${error.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;
