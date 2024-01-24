import { useEffect, useState } from "react";

import getAllUsers from "../actions/getAllUsers";
import { useSelector } from "react-redux";

const useWebSocket = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

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

  return [userInfo, ws, users, messages, setMessages];
};

export default useWebSocket;
