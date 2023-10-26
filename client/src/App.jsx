import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import Dashboard from "./pages/Dashboard";
import AuthLayout from "./layouts/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="profile" element={<Profile />} />

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;
