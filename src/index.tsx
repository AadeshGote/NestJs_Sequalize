import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-bootstrap";
import { Provider } from "react-redux";
import Store from "./store/Store";
import "./userList/UserList.css"
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
