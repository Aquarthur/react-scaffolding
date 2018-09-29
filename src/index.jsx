import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "~components/app.jsx";
import store from "./store";
import "./index.scss";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
