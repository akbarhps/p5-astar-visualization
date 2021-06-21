let canvasWidth = 0;
let canvasHeight = 0;

let gridRows = 20;
let gridColumns = 20;
let grid = [];

let cellWidth = 0;
let cellHeight = 0;

let openSet = [];
let closedSet = [];

let startCell;
let targetCell;
let currentCell;

let path = [];

let run = false;
let diagonalMove = true;