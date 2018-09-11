'use strict';

class Board {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    this.board = [];
    for (let i = 0; i < rows; i++) {
      this.board[i] = [];

      for (let j = 0; j < cols; j++) {
        this.board[i][j] = new Cell(i, j);
      }
    }

    this.endReached = false;
  }

  getCell(row, col) {
    return this.board[row][col];
  }
}

function drawBoard() {
  // console.log('Drawing board...')

  for (let i = 0; i < world.board.rows; i++) {
    for (let j = 0; j < world.board.cols; j++) {
      drawCell(world.board.getCell(i, j));
    }
  }
}

function getNeighbors(cell) {
  const neighbors = [];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i * i + j * j === 1) {
        const row = cell.row + i;
        const col = cell.col + j;

        if (isValidCell(row, col)) {
          neighbors.push(world.board.getCell(row, col));
        }
      }
    }
  }

  return neighbors;
}

function isValidCell(row, col) {
  return 0 <= row && row < world.board.rows &&
    0 <= col && col < world.board.cols;
}

function resetBoard() {
  world.board = new Board(world.config.rows, world.config.cols);
  console.log('The board was reset');
}

function colorFoundWay(cell) {
  if (!cell) {
    cell = world.board.getCell(world.config.end.row, world.config.end.col);
  }

  cell.status = CellStatus.MARKED;

  if (cell.parent) {
    setTimeout(() => colorFoundWay(cell.parent), world.config.stepWait);
  }
}
