import React from "react";
// 'React' must be in scope when using JSX
import { useState } from "react";

function Square({ value, onSquareClick, color }) {
  // const [value, setValue] = useState(null);
  // function handleClick() {
  //   setValue("X");
  //   console.log("clicked!");
  // }

  // return (
  //   <button className="square" onClick={handleClick}>
  //     {value}
  //   </button>
  // );
  return (
    <button className="square" onClick={onSquareClick} style={{ color }}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice(); //copy squares
    // nextSquares[i] = "X";
    if (xIsNext % 2 === 0) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext % 2 === 0 ? "X" : "O");
  }

  const rows = [];
  for (let r = 0; r < 3; r++) {
    let row = [];
    for (let c = 0; c < 3; c++) {
      let i = 3 * r + c;
      if (
        winner &&
        (winner[1][0] === i || winner[1][1] === i || winner[1][2] === i)
      ) {
        row.push(
          <Square
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
            color="red"
          />
        );
      } else {
        row.push(
          <Square
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
            color="black"
          />
        );
      }
    }
    rows.push(<div className="board-row">{row}</div>);
  }

  return (
    <React.Fragment>
      <div className="status">{status}</div>
      {rows}
    </React.Fragment>
  );

  // return (
  //   <React.Fragment>
  //     <div className="status">{status}</div>
  //     <div className="board-row">
  //       <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
  //       <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
  //       <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
  //     </div>
  //     <div className="board-row">
  //       <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
  //       <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
  //       <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
  //     </div>
  //     <div className="board-row">
  //       <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
  //       <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
  //       <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
  //     </div>
  //   </React.Fragment>
  // );
}
export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // const currentSquares = history[history.length - 1];
  // const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    // setHistory([...history, nextSquares]);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    //creates a new array that contains all the items in history, followed by nextSquares.
    // setXIsNext(!xIsNext);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={currentMove}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
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

/*
If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game, listed in order of increasing difficulty:

For the current move only, show “You are at move #…” instead of a button.
Rewrite Board to use two loops to make the squares instead of hardcoding them.
Add a toggle button that lets you sort the moves in either ascending or descending order.
When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
Display the location for each move in the format (row, col) in the move history list.
Throughout this tutorial, you’ve touched on React concepts including elements, components, props, and state. Now that you’ve seen how these concepts work when building a game, check out Thinking in React to see how the same React concepts work when build an app’s UI.
*/
