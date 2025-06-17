import { uploadCloud } from "../lib/cloudinary.js";
import { getIO, getSocketId } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const checkauth = (req, res) => {
	if(!req.user) {
		return res.status(401).json({"message":"Invalid user"});
	}
	res.status(200).json(req.user);
};

export const getUsersForSidebar = async (req, res) => {
	if(!req.user) {
		return res.status(401).json({"message": "Unauthorised."});
	}
	
	try {
		var allUsers = await User.find({
			_id: { $ne : req.user._id}
		}).select("-password -messages");
	}
	catch (error) {
		console.log("mongoDB receive Error", error.message);
		return res.status(500).json({"message": "Internal Server Error."})
	}
	
	if(!allUsers) {
		allUsers = [req.user];
	}

	return res.status(200).json({allUsers})
};

export const getMessages = async (req, res) => {
	if(!req.user) {
		return res.status(401).json({"message": "Unauthorised."});
	}

	const receiverId = req.params.id;
	if(!receiverId) {
		res.status(401).json({"message": "Receiver not found"});
	}
	try {
		const user = await User.findById(req.user._id).populate("messages").exec();
		if(!user) {
			res.status(401).json({"message": "no user found."})
		}

		const allMessages = user.messages.filter((message) => {
			return message.sender.equals(receiverId) || message.receiver.equals(receiverId);
		})

		return res.status(201).json({"messages": allMessages});
	}
	catch (error) {
		res.status(500).json({"message": "Server Error."});
	}
};

export const sendMessage = async (req, res) => {
	if (!req.user) {
		return res.status(401).json({ "message": "Unauthorised." });
	}

	const sender = req.user._id;
	const receiver = req.params.id;
	if (!sender || !receiver) {
		return res.status(401).json({ "message": "Sender or receiver status cannot be confirmed." });
	}

	const { text="" , image="" } = req.body;
	if ((!text || !text.trim()) && !image) {
		return res.status(404).json({ "message": "Enter valid message." });
	}

	let imageUrl = "";
	if (image) {
		try {
			imageUrl = await uploadCloud(image);
		} catch (error) {
			console.log("Error cloudinary upload: ", error.message);
			return res.status(501).json({ "message": "Image not uploaded." });
		}
	}

	try {
		const newMessage = new Message({
			sender,
			receiver,
			text: text ? text.trim() : "",
			image: imageUrl,
		});

		const savedMessage = await newMessage.save();

		const senderUser = await User.findById(sender).select("messages _id");
		const receiverUser = await User.findById(receiver).select("messages _id");

		if (!senderUser || !receiverUser) {
			return res.status(404).json({ "message": "Sender or receiver not found." });
		}

		senderUser.messages.push(savedMessage._id);
		receiverUser.messages.push(savedMessage._id);

		await senderUser.save();
		await receiverUser.save();

		//socket.io integration
		const io = getIO();
		const receiverSocketId = getSocketId(receiver);
		if(receiverSocketId) {
			//user online
			io.to(receiverSocketId).emit("newMessage", savedMessage);
		}
		return res.status(201).json(savedMessage);
	} 
	catch (error) {
		console.log("Error saving message: ", error.message);
		return res.status(500).json({ "message": "Server Error." });
	}
};

