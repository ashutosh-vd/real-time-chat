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
			set({authUser: res});
			toast.success("Account Created Successfully");
		}
		catch {
			toast.error("Sign up failed...");
		}
		finally {
			set({isSigningUp: false});
		}
	},
}));