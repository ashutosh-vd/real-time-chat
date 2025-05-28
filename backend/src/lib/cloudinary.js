import cloudinary from 'cloudinary'
import dotenv from "dotenv"

dotenv.config();

// console.log(process.env);
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadCloud = async (profilePic) => {	
	try {
		const url = await cloudinary.v2.uploader.upload(profilePic , { 
			use_filename: true,
			folder: 'chat-rt',
		})
		.then((result) => {
			// console.log(result);
			return result.secure_url;
		});
		return url;
	}
	catch (error) {
		throw error ;
	}
};