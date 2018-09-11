'use strict';

function generateMaze() {
  resetBoard();

  for (let i = 0; i < world.board.rows; i++) {
    for (let j = 0; j < world.board.cols; j++) {
      world.board.getCell(i, j).status = CellStatus.WALL;
    }
  }

  const start = world.board.getCell(world.config.start.row, world.config.start.col);
  const end = world.board.getCell(world.config.end.row, world.config.end.col);

  start.status = CellStatus.UNREACHED;
  end.status = CellStatus.WALL;

  randomizedDFS([start], () => {
    removeRandomWalls(world.board.rows * world.board.cols * 0.03);
    end.status = CellStatus.UNREACHED;

    console.log('Maze generated');
  });
}

function randomizedDFS(cellStack, cb) {
  if (cellStack.length === 0) {
    cb();
    return;
  }

  const cell = cellStack.pop();
  if (isStart(cell) || countUnreachedNeighbors(cell) === 1) {

    cell.status = CellStatus.UNREACHED;

    getNeighbors(cell)
      .filter(neighbor => neighbor.status === CellStatus.WALL)
      .filter(neighbor => countUnreachedNeighbors(neighbor) === 1)
      .sort(shuffle)
      .forEach(neighbor => cellStack.push(neighbor));
  }

  setTimeout(() => randomizedDFS(cellStack, cb), 0);
}

function countUnreachedNeighbors(cell) {
  return getNeighbors(cell)
    .filter(neighbor => neighbor.status === CellStatus.UNREACHED)
    .length;
}

function shuffle() { // pass this func to Array.sort() to shuffle randomly (naive implementation)
  return .5 - Math.random();
}

function removeRandomWalls(count) {
  const walls = [];

  for (let i = 0; i < world.board.rows; i++) {
    for (let j = 0; j < world.board.cols; j++) {
      const cell = world.board.getCell(i, j);
      if (cell.status === CellStatus.WALL) {
        walls.push(cell);
      }
    }
  }

  walls.sort(shuffle);

  for (let i = 0; i < count; i++) {
    const cell = walls.pop();
    cell.status = CellStatus.UNREACHED;
  }
}


