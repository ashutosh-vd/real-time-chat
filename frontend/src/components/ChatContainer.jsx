import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import MessageHead from './MessageHead.jsx';
import MessageBody from './MessageBody.jsx';
import MessageInput from './MessageInput.jsx';
import MessageBodySkeleton from './skeletons/MessageBodySkeleton.jsx';

const ChatContainer = () => {

  const {isMessagesLoading, getMessages, selectedUser} = useChatStore();

  useEffect(() => {
    getMessages(selectedUser);
  }, [selectedUser, getMessages]);

  if(isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <MessageHead />
        <MessageBodySkeleton />
        <MessageInput />
      </div>
    )
  }
  return (
	<div className="flex flex-1 flex-col overflow-auto">
    <MessageHead />
    <MessageBody />
    <MessageInput />
  </div>
  )
}

export default ChatContainer