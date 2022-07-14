import React from "react";
import ChatWindow from "./ChatWindow";
import Sidebar from "./Sidebar";

function ChatRoom() {
  return (
    <div className="min-h-screen max-w-screen-xl min-w-full grid grid-cols-4">
      <div className="lg:col-span-1 col-span-4">
        <Sidebar />
      </div>
      <div className="lg:col-span-3 col-span-4">
        <ChatWindow />
      </div>
    </div>
  );
}

export default ChatRoom;
