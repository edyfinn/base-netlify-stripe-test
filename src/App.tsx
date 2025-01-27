import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate }
    from "react-router-dom";

import Payment from "./components/payment";
import Login from "./components/logeo";
import Home from "./components/home";
import Welcome from "./components/welcome";
import Main from "./main";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/payment"
                element={<Payment stripePromise={undefined} />} />
            <Route path="/logeo"
                element={<Login />} />
            <Route path="/home"
                element={<Home />} />
            <Route path="/"
                element={<Welcome />} />
            <Route path="/main"
                element={<Main />} />
        </Routes>
    </Router>
);
  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
}

export default App;
