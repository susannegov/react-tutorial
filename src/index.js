/* Finished tutorial -> TO DO 
 * If you have extra time or want to practice your new React skills, here are some ideas for improvements 
 * that you could make to the tic-tac-toe game which are listed in order of increasing difficulty:
    1) Display the location for each move in the format (col, row) in the move history list. DONE
    2) Bold the currently selected item in the move list. DONE
    3) Rewrite Board to use two loops to make the squares instead of hardcoding them. DONE
    4) Add a toggle button that lets you sort the moves in either ascending or descending order.
    5) When someone wins, highlight the three squares that caused the win.
    6) When no one wins, display a message about the result being a draw.

*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Converts number value to coordinates
function indexToCoordinate(i) {
    if (i > 5) {
        return [(i - 5), 3];
    } else if (i > 2) {
        return [(i - 2), 2];
    } else {
        return [i + 1, 1];
    }
}

// Square function that takes props as an input and returns the render value
function Square(props) {
    return (
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );
}

// Declares winner for 3 in a row
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal or if +1 incremental starting 0 3 6
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical or if +3 incremental starting 0 1 2
        [0, 4, 8], [2, 4, 6], // diagonal or if +4 incremental starting 0 or if +2 incremental starting 2
    ]

    // from the tutorial
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// Class to create Tic Tac Toe board
class Board extends React.Component {
    renderSquare(i) { // this is a method that creates a square
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                key={indexToCoordinate(i)}
            />
        );
    }

    render() {
        const tile = [];
        const col = 3; 
        const row = 3;

        // create matrix for tic tac toe
        for (let j = 0; j < col * row; j += col) {
            for (let i = 0; i < col; i++) {
                tile.push(this.renderSquare(i + j));
            }
            tile.push(<div key={j}></div>);
        }

        return (
            <div>
                <div className="board-row" key = "board">
                    {tile}
                </div>
            </div>
        );
     }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                coordinates: [],
            }], // creates empty array from 0 to 9
            stepNumber: 0,
            xIsNext: true,
            ascend: true,
        };
    }

    nextPlayer() { // changes player from X to O
        return this.state.xIsNext ? 'X' : 'O'
    }

    handleClick(i) { // method when square is clicked change state of the board
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice(); // copies array of squares when clicked.
        const coordinates = current.coordinates.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.nextPlayer(); // example: [null, null, null] becomes ['X',null,null] on click
        coordinates[this.state.stepNumber] = indexToCoordinate(i); // [null,null] becomes [[x1,y1],null]

        this.setState({
            history: history.concat([{
                squares: squares, 
                coordinates: coordinates,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext, // reverses value
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const xy = history[history.length - 1].coordinates;

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + ' (' + xy[move - 1] + ')':
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {move === this.state.stepNumber ?
                            <b>{desc}</b> :
                            desc}
                    </button>
                </li>
            );
        });


        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = 'Next player: ' + this.nextPlayer(); // changed to nextPlayer method
        }
/*        const toggle = () => {
            return (
                
                
                );
        }*/

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) =>this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>{/*toggle*/}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// =========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);