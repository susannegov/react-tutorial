import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/* changing Square class to function
class Square extends React.Component {
     // in tutorial: "Delete the constructor from Square because Square no longer keeps track of the game’s state"
     constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <button className="square" onClick={props.onClick()}>
                {props.value}
            </button>
        );
    }
}*/

// Square function that takes props as an input and returns the render valuye
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
            />
        );
    }

    render() {
        const tile = [];
        const size = 3; //this is a 3x3 tic tac toe

        // create matrix for tic tac toe
        for (let j = 0; j < size * size; j += size) {
            for (let i = 0; i < size; i++) {
                    tile.push(this.renderSquare(i + j));
            }
            tile.push(<div></div>);
        }

        return (
            <div>
                <div className="board-row">
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
                squares: Array(9).fill(null)
            }], // creates empty array from 0 to 9
            xIsNext: true,
        };
    }

    nextPlayer() { // changes player from X to O
        return (this.state.xIsNext ? 'X' : 'O');
    }

    handleClick(i) { // method when square is clicked change state of the board
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice(); // copies array of squares when clicked.
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.nextPlayer()
        this.setState({
            history: history.concat([{
                squares: squares, // example: [null, null, null] becomes ['X',null,null] on click
            }]),
            xIsNext: !this.state.xIsNext, // reverses value
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = 'Next player: ' + this.nextPlayer(); // changed to nextPlayer method
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/*set how many turns*/}</ol>
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