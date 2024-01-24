import ChatContext from "../context/ChatContext";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import Messages from "../components/Messages";
import NoConvo from "../components/NoConvo";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import useWebSocket from "../hooks/useWebSocket";

const Chat = () => {
  const [selecteduser, setSelectedUser] = useState();

  const [userInfo, ws, users, messages, setMessages] = useWebSocket();

  return (
    <ChatContext.Provider
      value={{
        selecteduser,
        setSelectedUser,
        userInfo,
        ws,
        users,
        messages,
        setMessages,
      }}
    >
      {selecteduser && <ChatHeader />}
      <Sidebar />
      {!selecteduser ? (
        <NoConvo />
      ) : (
        <div className="relative w-full ps-80 bg-gray-50">
          <Messages />
          <ChatInput />
        </div>
      )}
    </ChatContext.Provider>
  );
};

export default Chat;
