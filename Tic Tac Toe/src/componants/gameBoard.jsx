// import { useState } from "react"

export default function GameBoard({ onSelectedPlayer, board }) {
  // const [gameBoard,setGameBoard]=useState(initialBoard);

  // function handleBoxSelect(rowIndex,colIndex){
  //     setGameBoard((prevGameBoard)=>{
  //         const updatedBoard = [...prevGameBoard.map(innerArray =>[...innerArray])];
  //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol
  //         return updatedBoard;
  //     })
  //   onSelectedPlayer();
  // }
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => {
                    onSelectedPlayer(rowIndex, colIndex);
                  }}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
