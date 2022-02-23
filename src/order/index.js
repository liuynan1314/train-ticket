import React from "react";
import ReactDOM from "react-dom";
import store from "./store.js";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";
import "normalize.css";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById("root")
);
