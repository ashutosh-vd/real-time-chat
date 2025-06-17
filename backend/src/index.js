import express from 'express';
import http from "http";
import { Server } from "socket.io"
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { initSocket } from './lib/socket.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors({
	origin: [process.env.CORS_ORIGIN],
	credentials: true,
}))

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
 
// socket connection

const server = http.createServer(app);

const io = initSocket(server);

const PORT = process.env.PORT;
server.listen(PORT, async (error) => {
	if(error) {
		console.log('express server connection error', error.message);
		return;
	}
	await connectDB();
	console.log('server is listening on port:'+PORT)
})