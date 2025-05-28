import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	text: {
		type: String,
	},
	image: {
		type: String,
		default: "",
	}
}, {timestamps: true});