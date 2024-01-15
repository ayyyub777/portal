import { Route, Routes } from "react-router-dom";

import Chat from "./pages/Chat";
import Error from "./pages/Error";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />

        <Route element={<PrivateRoute />}>
          <Route index element={<Chat />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;
