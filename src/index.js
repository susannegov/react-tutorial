import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class Square extends React.Component {
    render() {
        return (
            <button className="square">
                {/* do something i'm not sure yet*/}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square />;
    }

    render() {
        const status = 'Next player X';
        const tiles = [0, 3, 6]; //create grid index


        return (
            <div>
                <div className="status">{status}</div>
                {tiles.map((x, index) => ( // map squares
                    <div className="board-row">
                        {this.renderSquare(x)}
                        {this.renderSquare(x + 1)}
                        {this.renderSquare(x + 2)}
                    </div>
                ))}
            </div>
                )
     }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status comment */}</div>
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