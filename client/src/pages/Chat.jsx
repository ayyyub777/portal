import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { clearUserInfo } from "../slices/userInfoSlice";
import { getInitials } from "../../utils/formatter";
import { useLogoutMutation } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ws, setWs] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [selecteduser, setSelectedUser] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [sentMessage, setSentMessage] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5500", "echo-protocol");

    setWs(ws);
    ws.addEventListener("message", handleMessage);
  }, []);

  function handleMessage(e) {
    const message = JSON.parse(e.data);
    if (message && typeof message === "object" && "online" in message) {
      showOnlineUsers(message.online);
    } else {
      setSentMessage((prev) => [...prev, { text: message.text, moi: false }]);
    }
  }

  function showOnlineUsers(data) {
    const users = {};
    data.forEach(({ userId, name }) => {
      users[userId] = name;
    });
    delete users[userInfo._id];

    setOnlineUsers(users);
  }

  function sendMessage(e) {
    e.preventDefault();
    if (!newMessage) return;
    ws.send(
      JSON.stringify({
        recipient: selecteduser,
        text: newMessage,
      })
    );
    setSentMessage((prev) => [...prev, { text: newMessage, moi: true }]);
    setNewMessage("");
  }

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await logout();
      dispatch(clearUserInfo());
      navigate("/");
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };
  return (
    <>
      {selecteduser && (
        <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:ps-80">
          <div className="flex basis-full items-center mx-auto px-4 sm:px-6 md:px-8">
            <div className="me-5 lg:me-0 lg:hidden">toggle</div>
            <div className="flex items-center gap-x-3">
              <div className="relative inline-block">
                <img
                  className="inline-block h-[2.375rem] w-[2.375rem] rounded-full"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Image Description"
                />
                <span className="absolute bottom-0 end-0 block h-2 w-2 rounded-full ring-2 ring-white bg-green-500"></span>
              </div>
              <div className="grow">
                <span className="block font-medium text-gray-600">
                  {onlineUsers[selecteduser]}
                </span>
                <span className="block text-sm text-gray-400">
                  {selecteduser in onlineUsers ? "Active now" : "Offline"}
                </span>
              </div>
            </div>
          </div>
        </header>
      )}
      <div className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-80 bg-white border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        <nav
          className="hs-accordion-group w-full h-full flex flex-col"
          data-hs-accordion-always-open
        >
          <div className="h-full ">
            <ul className="space-y-1.5 p-4 ">
              {Object.keys(onlineUsers).map((userId) => (
                <li
                  key={userId}
                  onClick={() => setSelectedUser(userId)}
                  className={`cursor-pointer ${
                    userId === selecteduser ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="ps-6 lg:ps-3 pe-6 py-3 px-2">
                    <div className="flex items-center gap-x-3">
                      <div className="relative inline-block">
                        <span className="inline-flex items-center justify-center h-[2.875rem] w-[2.875rem] rounded-full bg-gray-300 font-semibold text-white leading-none">
                          {getInitials(onlineUsers[userId])}
                        </span>
                        <span className="absolute bottom-0 end-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
                      </div>
                      <div className="grow">
                        <span className="block text-sm font-medium text-gray-600">
                          {onlineUsers[userId]}
                        </span>
                        <span className="block text-sm text-gray-400">
                          what is preline ui?
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto">
            <div className="py-2.5 px-7">
              <p className="inline-flex items-center gap-x-2 text-xs text-green-600">
                <span className="block w-1.5 h-1.5 rounded-full bg-green-600" />
                {`${
                  Object.keys(onlineUsers).length
                    ? Object.keys(onlineUsers).length + " Active users"
                    : "No Active users"
                }`}
              </p>
            </div>
            <div className="p-4 border-t border-gray-200 ">
              <a
                className="flex justify-between items-center gap-x-3 py-2 px-3 text-sm text-slate-700 rounded-lg cursor-pointer hover:bg-gray-100"
                type="submit"
                onClick={handleLogout}
              >
                {isLoading ? "Signing out ..." : "Sign out"}
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1={15} x2={3} y1={12} y2={12} />
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </div>
      {!selecteduser ? (
        <div className="max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:ps-80 mx-auto text-center">
          <p className="text-gray-600">
            Start a conversation by selecting a person
          </p>
        </div>
      ) : (
        <div className="relative w-full lg:ps-80 bg-gray-50">
          <div className="overflow-y-scroll px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto h-[calc(100vh-93.6667px-72.8333px)]">
            <ul className="space-y-5">
              {sentMessage.map((message, index) =>
                message.moi ? (
                  <li key={index} className="flex ms-auto gap-x-2 sm:gap-x-4">
                    <div className="grow text-end space-y-3">
                      <div className="inline-block bg-blue-600 rounded p-3 shadow-sm">
                        <p className="text-sm text-white">{message.text}</p>
                      </div>
                    </div>
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-300">
                      <span className="text-sm font-medium text-white leading-none">
                        {getInitials(userInfo.name)}
                      </span>
                    </span>
                  </li>
                ) : (
                  <li
                    key={index}
                    className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11"
                  >
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-300">
                      <span className="text-sm font-medium text-white leading-none">
                        {getInitials(onlineUsers[selecteduser])}
                      </span>
                    </span>
                    <div className="bg-white border border-gray-200 rounded p-3 space-y-3 ">
                      <p className="text-sm text-gray-800 ">{message.text}</p>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
          <footer className="mx-auto sticky bottom-0 z-10 bg-gray-50 pt-2 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6 lg:px-0">
            <form className="relative mx-4 flex gap-3" onSubmit={sendMessage}>
              <input
                className="p-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Send
              </button>
            </form>
          </footer>
        </div>
      )}
    </>
  );
};

export default Chat;
