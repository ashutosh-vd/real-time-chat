import { Server } from "socket.io";

let io = null;
const onlineUsersMap = {};

export function initSocket(server) {
	io = new Server(server, {
		cors : {
			origin: [process.env.CORS_ORIGIN],
		},
	})

	io.on("connect", (socket) => {
		// console.log("A user connected: " + socket.id)

		const userId = socket.handshake.auth.userId;
		
		if(!userId) return;
		onlineUsersMap[userId] = socket.id;

		io.emit("updateOnlineUsers", Object.keys(onlineUsersMap));

		socket.on("disconnect", () => {
			// console.log("user disconnected: " + socket.id);
			delete onlineUsersMap[userId];
			io.emit("updateOnlineUsers", Object.keys(onlineUsersMap));
		})
	});

	return io;
};

export function getIO() {
	if(!io) throw new Error("Socket.io not initialised!");
	return io;
};



export function getSocketId(id) {
	return onlineUsersMap[id];
};