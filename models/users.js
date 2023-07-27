const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		first_name: {
			type: String,
			required: [true, "Please Enter First Name"],
		},
		last_name: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			unique: [true, , "Email address already exists"],
			required: [true, "Please Enter Email address"],
		},
		password: {
			type: String,
			required: [true, "Please Enter Password"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", userSchema);
