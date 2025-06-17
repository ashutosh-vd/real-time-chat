import React, { useRef } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import MessageBodySkeleton from './skeletons/MessageBodySkeleton.jsx';
import { useAuthStore } from '../store/useAuthStore.js';
import { formatMessageTime } from '../lib/formatMessageTime.js';
import { useEffect } from 'react';

const MessageBody = () => {
	const {selectedUser, isMessageLoading, messages, getMessages, subscribeToMessages, unsubscribeToMessages} = useChatStore();
	const { authUser } = useAuthStore();
	const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeToMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeToMessages]);

	if(isMessageLoading) {
		return (
			<MessageBodySkeleton />
		)
	}
  return (
	<div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.sender === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.sender === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
  )
}

export default MessageBody