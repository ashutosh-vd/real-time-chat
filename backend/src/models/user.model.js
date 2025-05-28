import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		fullname: {
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
		messages: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		}],
		profilePic: {
			type: String,
			default: "",
		}
	},
	{timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;
