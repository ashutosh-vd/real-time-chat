import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';

const app = express();
dotenv.config();

import authRoutes from './routes/auth.route.js'
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, async (error) => {
	if(error) {
		console.log('express server connection error', error.message);
		return;
	}
	await connectDB();
	console.log('server is listening on port:'+PORT)
})