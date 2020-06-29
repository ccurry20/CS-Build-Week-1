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
            <h1>Rules</h1>
            <p>The universe of the Game of Life is an infinite</p>
            <p>two-dimensional orthogonal grid of square cells, each of which is in one of two possible states,live or dead</p>
            <p>or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:</p>
            <p>1. Any live cell with fewer than two live neighbors dies, as if caused by under population.</p>
            <p>2. Any live cell with two or three live neighbors lives on to the next generation.</p>
            <p>3. Any live cell with more than three live neighbors dies, as if by overpopulation.</p>
            <p>4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</p>
            <div>
            <Link to="/">Return to Game</Link>
            </div>
          </p>
        </div>
     
      );
    }
  }
  export default Rules;