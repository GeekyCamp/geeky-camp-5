'use strict';

function dijkstra() {
  const start = world.board.getCell(world.config.start.row, world.config.start.col);

  start.parent = undefined;
  start.distFromStart = 0;
  const cellsPriorityQueue = [start];

  cellsPriorityQueue.remove = () => {
    cellsPriorityQueue.sort(dijkstraCellCompare);
    return cellsPriorityQueue.shift();
  };

  priorityQueueTraverse(cellsPriorityQueue);
}

function dijkstraCellCompare(cellA, cellB) {
  return cellA.distFromStart - cellB.distFromStart;
}

function aStar() {
  precomputeEstimatedDistToEnd();

  const start = world.board.getCell(world.config.start.row, world.config.start.col);

  start.parent = undefined;
  start.distFromStart = 0;
  const cellsPriorityQueue = [start];

  // Note this is a suboptimal priority queue implementation
  cellsPriorityQueue.remove = () => {
    cellsPriorityQueue.sort(aStarCellCompare);
    return cellsPriorityQueue.shift();
  };

  priorityQueueTraverse(cellsPriorityQueue);
}

function aStarCellCompare(cellA, cellB) {
  return (cellA.distFromStart + cellA.estimatedDistToEnd)
    - (cellB.distFromStart + cellB.estimatedDistToEnd);
}

function precomputeEstimatedDistToEnd() {
  const end = world.board.getCell(world.config.end.row, world.config.end.col);

  for (let i = 0; i < world.board.rows; i++) {
    for (let j = 0; j < world.board.cols; j++) {
      const cell = world.board.getCell(i, j);

      // Straight-line distance
      cell.estimatedDistToEnd = Math.hypot(cell.row - end.row, cell.col - end.col);
    }
  }
}

function priorityQueueTraverse(cellsToVisit) {
  if (cellsToVisit.length === 0 || world.board.endReached) {
    return;
  }

  const cell = cellsToVisit.remove();

  console.log('Visiting (%d, %d)', cell.row, cell.col);
  cell.status = CellStatus.CLOSED;

  if (cell.row === world.config.end.row && cell.col === world.config.end.col) {
    console.log('The end was reached');
    world.board.endReached = true;
    colorFoundWay();
  }

  getNeighbors(cell)
    .filter(neighbor =>
      neighbor.status === CellStatus.UNREACHED ||
      neighbor.status === CellStatus.OPEN)
    .forEach(neighbor => {
      if (neighbor.status === CellStatus.UNREACHED) {
        neighbor.status = CellStatus.OPEN;
        cellsToVisit.push(neighbor);
        neighbor.parent = cell;
        neighbor.distFromStart = cell.distFromStart + 1;
      }

      if (neighbor.distFromStart > cell.distFromStart + 1) {
        neighbor.distFromStart = cell.distFromStart + 1;
        neighbor.parent = cell;
      }
    });

  setTimeout(() => {
    priorityQueueTraverse(cellsToVisit);
  }, world.config.stepWait);
}
