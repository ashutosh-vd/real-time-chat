// import express from 'express'
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt'

export const signup = async (req , res) => {
	const {email, fullname, password} = req.body;
	[email, fullname].forEach((element) => {
		if(!element.trim()) {
			console.log('Empty field');
			return res.status(401).json({'message': `Required Fields cannot be empty.`})
		}
	})

	if(password.length < 6) {
		return res.status(401).json({"message": "Password cannot be less than 6 characters."});
	}

	const existingUser= await User.findOne({email});
	if(existingUser) {
		return res.status(409).json({'message': 'User already Exists'});
	}

	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = await bcrypt.hashSync(password, salt);
	const user = new User({
		email: email.trim(),
		fullname: fullname.trim(),
		password: hashedPassword,
	})

	if(!User) {
		console.log('invalid User Data');
		return res.status(400).json({"message":"Invalid User Data"});
	}

 	try {
		//set jwt token
		await generateToken({'_id': user._id}, res);
		await user.save();
		
		return res.status(201).send(user);
	}
	catch(error) {
		console.log('server error', error.message)
		return res.status(500).json({'message': 'Internal Server Error'});
	}

};


export const login = async (req, res) => {
	const {email, password} = req.body;
	if(!email || !password) {
		return res.status(401).json({"message": "Login Fields required."});
	}
	
	const user = await User.findOne({email});

	if(!user) {
		return res.status(401).json({"message": "Incorrect login Credentials."});
	}

	const match = await bcrypt.compare(password, user.password);
	if(!match) {
		return res.status(401).json({"message": "Incorrect login Credentials."});
	}
	else {
		await generateToken({"_id": user._id}, res);
		return res.status(200).json({"message": "user logged in successfully"});
	}
};

export const logout = async (req, res) => {
	try {
		res.cookie("token", "", {
			maxAge: 0,
		});
		return res.status(200).json({"message": "Logged out Successfully"});
	}
	catch(error) {
		console.log('Logout error', error.message)
		return res.status(500).json({'message': 'Internal Server Error'});
	}
}