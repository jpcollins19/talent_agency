import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

const mainHTML = document.querySelector("#main-body");

window.React = React;
render(
  <Provider store={store}>
    <App />
  </Provider>,
  mainHTML
);
