import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	receiver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	text: {
		type: String,
	},
	image: {
		type: String,
		default: "",
	}
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;