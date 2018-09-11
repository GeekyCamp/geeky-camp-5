'use strict';

// TODO: make algorithms pausable

const world = {
  config: undefined,
  canvas: undefined,
  ctx: undefined,
  board: undefined
};

$(document).ready(() => {
  const defaultConfig = {
    rows: 30,
    cols: 30,
    start: { row: 0, col: 0 },
    end: { row: 25, col: 15 },
    stepWait: 50
  };

  console.log('Document ready. Initializing world...');

  world.config = defaultConfig;
  world.canvas = document.getElementById('canvas');
  world.ctx = world.canvas.getContext('2d');

  applyConfig();

  setupEventListeners();

  setInterval(() => {
    world.ctx.clearRect(0, 0, world.canvas.width, world.canvas.height);
    drawBoard();
  }, 1000 / 60); // draw 60 fps
});

function applyConfig() {
  world.config.rows      = parseInt(document.getElementById('input-rows').value) || world.config.rows;
  world.config.cols      = parseInt(document.getElementById('input-cols').value) || world.config.cols;
  world.config.start.row = parseInt(document.getElementById('input-start-row').value) || world.config.start.row;
  world.config.start.col = parseInt(document.getElementById('input-start-col').value) || world.config.start.col;
  world.config.end.row   = parseInt(document.getElementById('input-end-row').value) || world.config.end.row;
  world.config.end.col   = parseInt(document.getElementById('input-end-col').value) || world.config.end.col;
  world.config.stepWait  = parseInt(document.getElementById('input-step-wait').value) || world.config.stepWait;

  document.getElementById('input-rows').value = world.config.rows;
  document.getElementById('input-cols').value = world.config.cols;
  document.getElementById('input-start-row').value = world.config.start.row;
  document.getElementById('input-start-col').value = world.config.start.col;
  document.getElementById('input-end-row').value = world.config.end.row;
  document.getElementById('input-end-col').value = world.config.end.col;
  document.getElementById('input-step-wait').value = world.config.stepWait;

  console.log('Using config:', world.config);

  updateCanvasSize();
  resetBoard();
}

function updateCanvasSize() {
  world.canvas.setAttribute('height', world.config.rows * CELL_HEIGHT);
  world.canvas.setAttribute('width', world.config.cols * CELL_WIDTH);
}

function setupEventListeners() {
  world.canvas.addEventListener('mousemove', canvasMouseMoveListener, false);
  world.canvas.addEventListener('mousedown', canvasMouseDownListener, false);

  document.getElementById('btn-stop-traversing').addEventListener('click', () => world.board.endReached = true, false);

  document.getElementById('btn-reset-board').addEventListener('click', resetBoard, false);
  document.getElementById('btn-gen-maze').addEventListener('click', generateMaze, false);
  document.getElementById('btn-dfs').addEventListener('click', dfs, false);
  document.getElementById('btn-bfs').addEventListener('click', bfs, false);
  document.getElementById('btn-dijkstra').addEventListener('click', dijkstra, false);
  document.getElementById('btn-a-star').addEventListener('click', aStar, false);

  document.getElementById('btn-apply-config').addEventListener('click', applyConfig, false);
}

function canvasMouseMoveListener(mouseEvent) {
  const cell = getCellFromMouseEvent(mouseEvent);
  document.getElementById('info-row').textContent = cell.row;
  document.getElementById('info-col').textContent = cell.col;
  document.getElementById('info-status').textContent = cell.status;
  document.getElementById('info-dist-from-start').textContent = cell.distFromStart;
}

function canvasMouseDownListener(mouseEvent) {
  const cell = getCellFromMouseEvent(mouseEvent);

  cell.status = cell.status === CellStatus.WALL ? CellStatus.UNREACHED : CellStatus.WALL;
}

function getCellFromMouseEvent(mouseEvent) {
  const rect = world.canvas.getBoundingClientRect();
  const row = Math.floor((mouseEvent.clientY - rect.top) / CELL_HEIGHT);
  const col = Math.floor((mouseEvent.clientX - rect.left) / CELL_WIDTH);
  return world.board.getCell(row, col);
}
