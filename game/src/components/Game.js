import React from 'react';
import './Game.css';

//sets the width and height of board and cell size
const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

//render the cells this.state.cells to the board
class Cell extends React.Component {

    render() {
        const { x, y } = this.props;
        return (
            <div className="Cell" style={{
                left: `${CELL_SIZE * x + 1}px`,
                top: `${CELL_SIZE * y + 1}px`,
                width: `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
            }} />
        );
    }
}

//this.board to keep the board state, 
//and a cell list this.state.cells to keep the position of the cells. 
//Once the board state is updated, a method this.makeCells() will be called to generate the cell list from the board state.

class Game extends React.Component {

    constructor() {
        super();
        this.rows = HEIGHT / CELL_SIZE;
        this.cols = WIDTH / CELL_SIZE;

        this.board = this.makeEmptyBoard();
    }
//sets state of cells to empty array, isRunning to false, interval to 100 
    state = {
        cells: [],
        isRunning: false,
        interval: 100,
    }
    // Create an empty board (create the rows(y) and columns (x))
    makeEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
        }

        return board;
    }
    //getElementOffset() will calculate the position of the board element.
    getElementOffset() {
        //method returns the size of an element and its position relative to the viewport.
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }
    //Create cells from this.board
    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }

        return cells;
    }
    //handleClick() event handler will retrieve the click position, 
    //then convert it to relative position, 
    //and calculate the cols and rows of the cell being clicked. 
    //Then the cell state is reverted.
    handleClick = (event) => {
        //properties returns the pixels the current document has been scrolled from the upper left corner of the window, horizontally and vertically.
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: this.makeCells() });
    }
    //event handler to run the game when you select the Run button ..sets state of isRunning to true..runs RunIteration method
    runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    }
    //event handler to stop the game when you select Stop button..sets state of isRunning to false..clears window
    stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }
    //runIteration() to be called every iteration, runs rules: 
    // 2 or 3 neighbors lives, less than 2 dies, if dead with 3 neighbors, it comes alive (newboard true)
    runIteration() {
        let newBoard = this.makeEmptyBoard();

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbors = this.calculateNeighbors(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard;
        this.setState({ cells: this.makeCells() });

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        }, this.state.interval);
    }

    /**
     * Calculate the number of neighbors at point (x, y)
     * @param {Array} board 
     * @param {int} x 
     * @param {int} y 
     */
    calculateNeighbors(board, x, y) {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    }
    //handles interval change when you input new value in interval
    handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value });
    }
    //handles clearing the board when selecting the Clear button
    handleClear = () => {
        this.board = this.makeEmptyBoard();
        this.setState({ cells: this.makeCells() });
    }
    //handles random 
    handleRandom = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }

        this.setState({ cells: this.makeCells() });
    }

    render() {
        const { cells, interval, isRunning } = this.state;
        return (
            <div>
                <div className="Board"
                    style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
                    onClick={this.handleClick}
                    ref={(n) => { this.boardRef = n; }}>

                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                    ))}
                </div>
                
                <div className="controls">
                    Update every <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec 
                    {isRunning ?
                        <button className="button" onClick={this.stopGame}>Stop</button> : //Stop button
                        <button className="button" onClick={this.runGame}>Run</button>  //Run Button 
                    }
                    <button className="button" onClick={this.handleRandom}>Random</button> 
                    <button className="button" onClick={this.handleClear}>Clear</button>
                </div>
            </div>
        );
    }
}


export default Game;