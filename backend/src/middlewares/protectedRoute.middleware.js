import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const protectedRoute = async (req , res , next) => {
	const token = req.cookies?.token;
	if(!token) {
		return res.status(401).json({"message" : "Invalid Token Please Login"});
	}

	try {
		var decoded = await jwt.verify(token, process.env.JWT_SECRET);
		if(!decoded || !decoded._id) {
			return res.status(401).json({"message" : "Invalid Token Please Login"});
		}
	} 
	catch(error) {
		return res.status(401).json({"message" : "Invalid Token"});
	}

	const user = await User.findOne({_id: decoded._id}).select("-password -messages");
	if(!user) {
		return res.status(404).json({"message":"User Not Found"});
	}
	req.user = user;
	next();
};
