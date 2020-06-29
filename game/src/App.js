import React, { Component } from 'react';
import Game from './components/Game.js';
import { Link } from "@reach/router";
import './components/Game.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Conway's Game of Life</h1>
        </header>
        <p className="App-intro">
          To get started, press Play.
          <div>
          <Link to="Rules"> See Rules</Link>
          </div>
        </p>
        <Game />
      </div>
    
    );
  }
}
export default App;
