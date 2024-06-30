import Player from "./componants/player";
import GameBoard from "./componants/gameBoard";
import { useState } from "react";
import Log from "./componants/log";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./componants/gameOver.jsx";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(playerTurn) {
  let turn = "X";
  if (playerTurn.length > 0 && playerTurn[0].player === "X") {
    turn = "O";
  }
  return turn;
}

function App() {
  const [player, setPlayer] = useState({
    X: "player 1",
    O: "player 2",
  });
  const [playerTurn, setPlayerTurn] = useState([]);
  const activePlayer = deriveActivePlayer(playerTurn);
  let winner;

  let gameBoard = [...initialBoard.map((array) => [...array])];
  for (const turn of playerTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }
  const draw = playerTurn.length === 9 && !winner;

  function handleActivePlayer(rowIndex, colIndex) {
    // setActivePlayer((prevPlay) => (prevPlay === "X" ? "O" : "X"));
    setPlayerTurn((prevTurn) => {
      const turn = deriveActivePlayer(prevTurn);
      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: turn },
        ...prevTurn,
      ];
      return updatedTurn;
    });
  }
  function handleRematch() {
    setPlayerTurn([]);
  }
  function handlePlayer(symbol, newName) {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayer}
          />
          <Player
            name="player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayer}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} rematch={handleRematch} />
        )}
        <GameBoard onSelectedPlayer={handleActivePlayer} board={gameBoard} />
      </div>
      <Log turns={playerTurn} />
    </main>
  );
}

export default App;
