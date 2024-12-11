import "./game.css";
import { useCreateGame } from "../core/game";

export const Game = () => {
  const { grid, blockSums, colSums, rowSums, updateCell } = useCreateGame();

  return (
    <div className="game">
      <h1>Keep Mathing</h1>
      <div className="grid">
        {/* First row will be the column sums */}
        <div className="row">
          <div className="cell"></div>
          {colSums.map((sum, index) => (
            <div key={index} className="cell">
              {sum}
            </div>
          ))}
        </div>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            <div className="cell">{rowSums[rowIndex]}</div>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                onClick={() => updateCell(rowIndex, colIndex, null)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
