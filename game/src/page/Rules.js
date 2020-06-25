import React, { Component } from 'react';
import { Link } from "@reach/router";
import logo from "../img/conway.png";

class Rules extends Component {
    render() {
      return (
        <div className="Rules">
          <header className="Rules-header">
            <h1 className="Rules-title">Rules</h1>
          </header>
          <p className="Rules-intro">
            About this Algorithm
            <p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.</p>
            <img src={logo} alt="Logo" />;
            <div>
            <Link to="/">Return to Game</Link>
            </div>
          </p>
        </div>
     
      );
    }
  }
  export default Rules;