import ChatContext from "../context/ChatContext";
import { clearUserInfo } from "../slices/userInfoSlice";
import { getInitials } from "../../utils/formatter";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { selecteduser, setSelectedUser, users } = useContext(ChatContext);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="hs-overlay hs-overlay-open:translate-x-0 duration-300 transform fixed top-0 start-0 z-[60] w-80 bg-white border-e border-gray-200 overflow-y-auto block translate-x-0 end-auto bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
      <nav
        className="hs-accordion-group w-full h-full flex flex-col"
        data-hs-accordion-always-open
      >
        <div className="h-full overflow-scroll">
          <ul className="space-y-1.5 p-4 ">
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => setSelectedUser(user.id)}
                className={`cursor-pointer ${
                  user.id === selecteduser ? "bg-gray-100" : ""
                }`}
              >
                <div className="ps-6 lg:ps-3 pe-6 py-3 px-2">
                  <div className="flex items-center gap-x-3">
                    <div className="relative inline-block">
                      <span className="inline-flex items-center justify-center h-[2.875rem] w-[2.875rem] rounded-full bg-gray-300 font-semibold text-white leading-none">
                        {getInitials(user.name)}
                      </span>
                      {user.active && (
                        <span className="absolute bottom-0 end-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
                      )}
                    </div>
                    <div className="grow">
                      <span className="block text-sm font-medium text-gray-600">
                        {user.name}
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
                users.filter((user) => user.active).length
                  ? users.filter((user) => user.active).length + " Active users"
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
  );
};

export default Sidebar;
