import { useEffect, useState } from "react";

import ChatContext from "../context/ChatContext";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import Messages from "../components/Messages";
import NoConvo from "../components/NoConvo";
import Sidebar from "../components/Sidebar";
import getAllUsers from "../actions/getAllUsers";
import { useSelector } from "react-redux";

const Chat = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [ws, setWs] = useState(null);
  const [users, setUsers] = useState([]);
  const [selecteduser, setSelectedUser] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function connectToWS() {
      const ws = new WebSocket("ws://localhost:5500", "echo-protocol");
      setWs(ws);
      ws.addEventListener("message", handleWs);
      ws.addEventListener("close", connectToWS);
    }

    connectToWS();
  }, []);

  function handleWs(e) {
    const message = JSON.parse(e.data);
    if (message && typeof message === "object" && "online" in message) {
      showUsersWithState(message.online);
    } else {
      setMessages((prev) => [...prev, { text: message.text, moi: false }]);
    }
  }

  async function showUsersWithState(data) {
    const allUsers = await getAllUsers();
    delete allUsers[userInfo._id];

    const activeUsers = {};
    data.forEach(({ userId, name }) => {
      activeUsers[userId] = name;
    });
    delete activeUsers[userInfo._id];

    const users = [];

    Object.keys(allUsers).forEach((userId) =>
      activeUsers[userId]
        ? users.push({
            id: userId,
            name: allUsers[userId].name,
            active: true,
          })
        : users.push({
            id: userId,
            name: allUsers[userId].name,
            active: false,
          })
    );

    setUsers(users);
  }
  return (
    <ChatContext.Provider
      value={{
        userInfo,
        selecteduser,
        setSelectedUser,
        users,
        ws,
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
