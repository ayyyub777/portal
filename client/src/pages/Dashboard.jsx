import { Box, Button, Typography } from "@mui/material";
import { useLogoutMutation } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserInfo } from "../slices/userInfoSlice";

const Dashboard = () => {
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
      <Typography variant="h3">{`Hello ${userInfo.name}!`}</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? "spinner" : "Sign out"}
        </Button>
      </Box>
    </>
  );
};

export default Dashboard;
