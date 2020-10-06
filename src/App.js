import React, { Component } from "react";
import './App.css';
import { Route } from 'react-router-dom'
import Register from './components/register'
import Dashboard from './components/dashboard'
import Login from './components/login'
import Home from './components/home'

class App extends Component {
  state = {}
  render() {
    return (
      <div>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/" exact component={Dashboard}></Route>
        <Route path="/home" exact component={Home}></Route>
      </div>
    );
  }
}

export default App;
