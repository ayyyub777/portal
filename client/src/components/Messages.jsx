import { useContext, useEffect, useRef, useState } from "react";

import ChatContext from "../context/ChatContext";
import Spinner from "./ui/Spinner";
import { getInitials } from "../../utils/formatter";
import getMessagesById from "../actions/getMessagesById";

const Messages = () => {
  const { users, selecteduser, userInfo, messages, setMessages } =
    useContext(ChatContext);
  const autoScroll = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const div = autoScroll.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    async function fetchMessages() {
      if (selecteduser) {
        try {
          setLoading(true);
          const messages = await getMessagesById(selecteduser);
          setMessages(messages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchMessages();
  }, [selecteduser]);

  return (
    <div className="overflow-y-scroll px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14 mx-auto h-[calc(100vh-93.6667px-72.8333px)]">
      {loading ? (
        <Spinner />
      ) : (
        <ul className="space-y-5">
          {messages.map((message, index) =>
            message.moi ? (
              <li key={index} className="flex ms-auto gap-x-2 sm:gap-x-4">
                <div className="grow text-end space-y-3">
                  <div className="inline-block bg-blue-600 rounded px-3 py-2 shadow-sm">
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
                    {getInitials(
                      users.find((user) => user.id === selecteduser).name
                    )}
                  </span>
                </span>
                <div className="bg-white border border-gray-200 rounded px-3 py-2 space-y-3 ">
                  <p className="text-sm text-gray-800 ">{message.text}</p>
                </div>
              </li>
            )
          )}
          <div ref={autoScroll}></div>
        </ul>
      )}
    </div>
  );
};

export default Messages;
