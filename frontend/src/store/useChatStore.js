import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast"

export const useChatStore = create((set, get) => ({
	messages: [],
	users: [],
	selectedUser: null,
	isUsersLoading: false,
	isMessagesLoading: false,

	getUsers: async () => {
		set({isUsersLoading: true});
		try {
			const res = await axiosInstance.get("/message/sidebar");
			// toast.success("get users success");
			// console.log(res);
			set({users: res.data.allUsers});
		}
		catch (error) {
			toast.error(error.response.data.message);
		}
		finally {
			set({isUsersLoading: false});
		}
	},

	getMessages: async (data) => {
		set({isMessagesLoading: true});
		try{
			const res = await axiosInstance(`/message/${data._id}/messages`);
			set({messages: res.data.messages});
			// console.log("res: ", res);
		}
		catch (error) {
			toast.error(error.response.data.message);
		}
		finally {
			set({isMessagesLoading: false});
		}
	},

	setSelectedUser: (user) => set({selectedUser: user}),

	sendMessage: async (messageData) => {
		const {selectedUser, messages} = get();

		try {
			const res = await axiosInstance.post(`/message/${selectedUser._id}/send`, messageData);
			// console.log(Array.isArray(messages));
			set({messages: [...messages, res.data]});
		} 
		catch(error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	},
}))