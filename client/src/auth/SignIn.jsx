import { Link as RouteLink, useNavigate } from "react-router-dom";

import { setUserInfo } from "../slices/userInfoSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/authSlice";

const SignIn = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const res = await login({
        email: data.get("email"),
        password: data.get("password"),
      }).unwrap();

      dispatch(setUserInfo({ ...res }));
      navigate("/chat");
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  return <div>Sign in</div>;
};

export default SignIn;
