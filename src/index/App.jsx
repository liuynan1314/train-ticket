import React from "react";
import { connect } from "react-redux";
import DepartDate from "./components/DepartDate.jsx";
import HighSpeed from "./components/HighSpeed.jsx";
import Journey from "./components/Journey.jsx";
import Header from "../components/Header/Header.jsx";
import "./App.css";

const App = props => {
  return (
      <div>
          <Header />
          <Journey />
          <DepartDate />
          <HighSpeed />
      </div>
  );
};

export default connect(
  state => {},
  dispatch => {}
)(App);
