import React from "react";
import MessageHead from "./MessageHead.jsx";
import MessageBody from "./MessageBody.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageBodySkeleton from "./skeletons/MessageBodySkeleton.jsx";
const ChatContainer = () => {
  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <MessageHead />
      <MessageBody />
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
