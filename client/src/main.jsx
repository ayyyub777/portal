import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.jsx";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
