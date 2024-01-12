import { useDispatch, useSelector } from "react-redux";

import { clearUserInfo } from "../slices/userInfoSlice";
import { useLogoutMutation } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userInfo.userInfo);

  const handleSubmit = async (event) => {
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
      <h1>{`Hello ${userInfo.name}!`}</h1>
      <button type="submit" onClick={handleSubmit}>
        {isLoading ? "spinner" : "Sign out"}
      </button>
    </>
  );
};

export default Chat;
