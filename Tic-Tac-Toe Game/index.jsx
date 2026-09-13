const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = React.useState("X");

  const getWinner = () => {
    for (const [a, b, c] of winningCombinations) {
      if (
        squares[a] !== "" &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const winner = getWinner();
  const isDraw = !winner && squares.every((square) => square !== "");

  function handleClick(index) {
    if (winner || isDraw || squares[index] !== "") {
      return;
    }

    const newSquares = [...squares];
    newSquares[index] = currentPlayer;

    setSquares(newSquares);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function resetGame() {
    setSquares(Array(9).fill(""));
    setCurrentPlayer("X");
  }

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>

      <div className="board">
        {squares.map((value, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="message">
        {winner ? `Winner: ${winner}` : isDraw ? "Draw" : ""}
      </div>

      <button id="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}
