import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client"

const BASE_URL = "http://localhost:5001"

export const useAuthStore = create((set, get) => ({
	authUser: null,
	isCheckingAuth: true,
	removeAuth: () => set({authUser: null}),
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	onlineUsers: [],
	socket: null,

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("/message/checkauth");
			// console.log(res.data);
			set({authUser: res.data});
			get().connectSocket();
		}
		catch(error) {
			set({authUser: null});
			console.log("Error checkAuth: ", error.response.data.message);
		}
		finally {
			set({isCheckingAuth: false});
		}
	},


	signUp: async (data) => {
		set({isSigningUp: true});
		try {
			const res = axiosInstance.post( "/auth/signup", data);
			set({authUser: res.data});
			toast.success("Account Created Successfully");
		}
		catch {
			toast.error("Sign up failed...");
		}
		finally {
			set({isSigningUp: false});
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({authUser: null});
			get().disconnectSocket();
			toast.success("Logged out successfully");
		}
		catch(err) {
			toast.error("Log out failed: "+err.response.data.message)
		}
	},

	login: async (data) => {
		set({isLoggingIn: true});
		try {
			await axiosInstance.post("/auth/login", data);
			get().checkAuth();
			toast.success("Log in successfull.")
		}
		catch (err) {
			toast.error("Log in failed: "+err.response.data.message);
		}
		finally {
			set({isLoggingIn: false});
		}
	},

	updateProfile: async (data) => {
		set({isUpdatingProfile: true});
		try {
			const res = await axiosInstance.post("/auth/update", data);
			set({authUser: res.data});
			toast.success("profile changed");
		}
		catch (err) {
			toast.error(err.response.data.message);
		}
		finally {
			set({isUpdatingProfile: false});
		}
	},

	connectSocket: () => {
		if(!get().authUser || get().socket?.connected) return;
		
		const socket = io(BASE_URL, {
			auth: {
				userId: get().authUser._id,
			}
		});
		socket.connect();
		set({socket: socket});

		socket.on("updateOnlineUsers", (users) => {
			set({onlineUsers : users});
		});
	},

	disconnectSocket: () => {
		const { socket } = get();
		if(socket) socket.disconnect();
		set({socket: null});
	}
}));