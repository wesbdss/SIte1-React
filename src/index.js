import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

class Board extends React.Component {




    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

}
//{value: '/gifs/otaku1.gif'}
class Square extends React.Component {

    render() {
        return (<button className="square" onClick={() => this.props.onClick()}><img className="square" src={this.props.value} /> </button>);
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historico: [{
                squares: Array(9).fill(null),
            }
            ],
            Xvez: false,
            stepNumber:0,
        };
    }

    jumpTo(step){
        this.setState({
            stepNumber:step,
            Xvez: (step %2)===0,
        })
    }
    handleClick(i) {
        const history = this.state.historico;
        const current = history[history.length - 1]
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.Xvez ? '/gifs/otaku1.gif' : '/gifs/otaku2.gif';
        this.setState({
            historico: history.concat([{
                squares:squares
            }]),
            stepNumber: history.length,
            Xvez: !this.state.Xvez,
        });
    }

    render() {
        const historico = this.state.historico;
        const current = historico[this.state.stepNumber]
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.Xvez ? 'X' : 'O');
        }

        const moves = historico.map((step, move)=>{
            const desc = move ?
            'Go to move #' + move:
            'Go to game start';
            return(
                <li key={move}><button onClick={() => this.jumpTo(move)}>{desc}</button></li>
            );
        })

        return (<div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>)
    }
}

ReactDOM.render(
    <Game />, document.getElementById('root')
);