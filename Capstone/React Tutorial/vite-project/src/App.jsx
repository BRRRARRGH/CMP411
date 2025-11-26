import { useState } from 'react'; //imports Use state, which saves our data

function Square({ value, onSquareClick }) { //creates a function called square, which holds a value and whether it has been clicked or not
  return ( //creates button 
    <button className="square" onClick={onSquareClick}>  
      {value}
    </button> // sets the square equal to the value
  );
}

function Board({ xIsNext, squares, onPlay }) { //creates a board
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) { //if someone has won, don't update
      return;
    }
    const nextSquares = squares.slice(); //copies board state
    if (xIsNext) { //updates next board with the new x or o
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares); //calls onPlay with the next board state
  }

  const winner = calculateWinner(squares); //checks if winner is completed
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  } //sets status based on winner

  return ( // creates visual of board and current status
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() { //parent function game
  const [history, setHistory] = useState([Array(9).fill(null)]); // creates history array of empty array
  const [currentMove, setCurrentMove] = useState(0); //sets currentMove to 0
  const xIsNext = currentMove % 2 === 0; //sets is next to Mod 2 of currentMove
  const currentSquares = history[currentMove]; //sets current squares to the squares in history of the current move. 

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // creates array object with a copy of history with 1 extra index
    setHistory(nextHistory); //makes history into next history
    setCurrentMove(nextHistory.length - 1); //sets current move to length - 1, which is the latest move. 
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove); //sets current move to the move you want to jump to
  }

  const moves = history.map((squares, move) => { //transforms array into another - squares with board and the move num
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    } //creates description for history
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li> //creates list, with key move to jump to that board state
    );
  });

  return ( //creates the currentGameBoard by calling Board and displays with {moves}
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> 
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) { //calculates winner based on board states
  const lines = [ //possible wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) { //loops through lines array of arrays, and checks if the values are all the same. IF it is, someone won
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; //returns the value of the winner
    }
  }
  return null; //else return null
}
