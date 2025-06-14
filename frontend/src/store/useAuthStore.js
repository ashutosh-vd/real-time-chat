import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
	authUser: null,
	isCheckingAuth: true,
	removeAuth: () => set({authUser: null}),
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	onlineUsers: [],

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("/message/checkauth");
			set({authUser: res.data});
		}
		catch(error) {
			set({authUser: null});
			console.log("Error checkAuth: ", error);
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
			toast.success("Logged out successfully");
		}
		catch(err) {
			toast.error("Log out failed: "+err.response.data.message)
		}
	},

	login: async (data) => {
		set({isLoggingIn: true});
		try {
			const res = await axiosInstance.post("/auth/login", data);
			set({authUser: res.data});
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
}));