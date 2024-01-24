import { useContext, useState } from "react";

import ChatContext from "../context/ChatContext";

const ChatInput = () => {
  const { ws, selecteduser, setMessages } = useContext(ChatContext);
  const [newMessage, setNewMessage] = useState("");

  function sendMessage(e) {
    e.preventDefault();
    if (!newMessage || newMessage === " ") return;
    ws.send(
      JSON.stringify({
        recipient: selecteduser,
        text: newMessage,
      })
    );
    setMessages((prev) => [...prev, { text: newMessage, moi: true }]);
    setNewMessage("");
  }
  return (
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
  );
};

export default ChatInput;
