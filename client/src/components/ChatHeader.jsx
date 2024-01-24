import { useContext, useEffect, useState } from "react";

import ChatContext from "../context/ChatContext";
import { getInitials } from "../../utils/formatter";

const ChatHeader = () => {
  const { selecteduser, users } = useContext(ChatContext);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const user = users.find((user) => user.id === selecteduser);
    setCurrentUser(user);
  }, [selecteduser, users]);

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 ps-80">
      <div className="flex basis-full items-center mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-x-3">
          <div className="relative inline-block">
            <span className="inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-300 font-semibold text-white leading-none">
              {getInitials(currentUser.name)}
            </span>
            {currentUser.active && (
              <span className="absolute bottom-0 end-0 block h-2 w-2 rounded-full ring-2 ring-white bg-green-500"></span>
            )}
          </div>

          <div className="grow">
            <span className="block font-medium text-gray-600">
              {currentUser.name}
            </span>
            <span className="block text-sm text-gray-400">
              {currentUser.active ? "Active now" : "Offline"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
