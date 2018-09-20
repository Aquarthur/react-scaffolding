import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "~components/app";
import store from "./store";
import "./index.scss";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root"),
);
