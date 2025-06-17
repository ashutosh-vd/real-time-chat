import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast"
import { useAuthStore } from "./useAuthStore.js";

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

	getMessages: async (selectedUserId) => {
		set({isMessagesLoading: true});
		if(!selectedUserId) return;
		try{
			const res = await axiosInstance(`/message/${selectedUserId}/messages`);
			set({messages: res.data.messages});
			// console.log("res: ", res);
		}
		catch (error) {
			toast.error("error", error?.response?.data.message);
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

	subscribeToMessages: () => {
		if(!get().selectedUser) return;

		const socket = useAuthStore.getState().socket;

		socket.on("newMessage", (newMessage) => {
			set({messages: [...get().messages, newMessage]});
		});
	},

	unsubscribeToMessages: () => {
		const selectedUser = get().selectedUser;
		if (!selectedUser) return;

		const socket = useAuthStore.getState().socket;
		if (socket) {
			socket.off("newMessage");
		}
	},

}))