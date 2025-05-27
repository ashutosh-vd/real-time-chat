import jwt from 'jsonwebtoken'

export const generateToken = async (payload, res) => {
	var token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: '7d',
	});

	res.cookie('token', token, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
	});

	return token;
};