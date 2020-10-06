import React, { Component } from "react";
import "../App.css";
import { Route } from "react-router-dom";
import Register from "./register";

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <div className="wrapper">
        <h1 className="dashboard">Welcome to Masoon</h1>
        <Route exact path="/register" component={Register} className="dashboard_1">
          Register
        </Route>
      </div>
    );
  }
}

export default Dashboard;
