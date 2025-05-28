import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

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