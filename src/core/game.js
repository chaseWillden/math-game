import { useState } from "react";

/**
 * The game is simple.
 * It creates a 9x9 grid of cells with sums for each row, column and 3x3 block.
 * The game is played by the user.
 */

const createGrid = () => {
  // Initialize a 9x9 grid with null values
  const grid = Array.from({ length: 9 }, () => Array(9).fill(null));

  // Fill the grid with random numbers between 1 and 9
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      grid[i][j] = Math.floor(Math.random() * 9) + 1;
    }
  }

  return grid;
};

const calculateSums = (grid) => {
  const rowSums = grid.map((row) =>
    row.reduce((sum, cell) => sum + (cell || 0), 0)
  );
  const colSums = Array.from({ length: 9 }, (_, colIndex) =>
    grid.reduce((sum, row) => sum + (row[colIndex] || 0), 0)
  );
  const blockSums = [];

  for (let blockRow = 0; blockRow < 3; blockRow++) {
    for (let blockCol = 0; blockCol < 3; blockCol++) {
      let blockSum = 0;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          blockSum += grid[blockRow * 3 + row][blockCol * 3 + col] || 0;
        }
      }
      blockSums.push(blockSum);
    }
  }

  return { rowSums, colSums, blockSums };
};

const updateCell = (grid, row, col, value) => {
  const newGrid = grid.map((r, rowIndex) =>
    r.map((cell, colIndex) =>
      rowIndex === row && colIndex === col ? value : cell
    )
  );
  return newGrid;
};

const initializeGame = () => {
  let grid = createGrid();
  const sums = calculateSums(grid);

  return { grid, ...sums };
};

// Define a custom React hook to create the game
export const useCreateGame = () => {
  const [game, setGame] = useState(initializeGame());

  return {
    ...game,
    updateCell: (row, col, value) =>
      setGame((prevGame) => {
        return {
          ...prevGame,
          grid: updateCell(prevGame.grid, row, col, value),
          ...calculateSums(updateCell(prevGame.grid, row, col, value)),
        };
      }),
  };
};
