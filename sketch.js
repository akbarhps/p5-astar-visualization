/**
 * Akbar Hasadi Putra Siregar
 * 6/21/2021 04:07 PM
 * https://www.github.com/akbarhps
 */

function setupLayout() {
    canvasHeight = windowHeight - 100;
    canvasWidth = windowHeight - 100;
    createCanvas(canvasWidth, canvasHeight).parent('view');
    select("#diagonalMove").mousePressed(toggleDiagonalMove);
    select("#doStep").mousePressed(doStep);
    select("#doRun").mousePressed(toggleRun);
    select("#doRestart").mousePressed(resetProgress);
    select("#doShuffle").mousePressed(setupVariables);
    select("#openGithub").mousePressed(openGithub);
}

function setupVariables() {
    cellWidth = Math.floor(canvasWidth / gridColumns);
    cellHeight = Math.floor(canvasHeight / gridRows);

    for (let y = 0; y < gridRows; y++) {
        let columns = [];
        for (let x = 0; x < gridColumns; x++) {
            columns.push(new Cell(y, x));
        }
        grid[y] = columns;
    }
    resetProgress();
}

function resetProgress() {
    openSet = [];
    closedSet = [];
    path = [];
    currentCell = undefined;

    startCell = grid[0][0];
    targetCell = grid[gridRows - 1][gridColumns - 1];
    startCell.isObstacle = false;
    targetCell.isObstacle = false;

    path.push(startCell);
    openSet.push(startCell);
    drawLayout();
}

function setup() {
    frameRate(10);
    setupLayout();
    setupVariables();
}

function draw() {
    if (run) {
        doStep();
    }
}

function toggleDiagonalMove() {
    diagonalMove = !diagonalMove;
    if (diagonalMove) {
        select("#diagonalMove").html('Diagonal Move ✔').addClass('active');
        if (openSet.length === 0) {
            openSet.push(currentCell);
            removeElementFromArray(closedSet, currentCell);
            drawLayout();
        }
    } else {
        select("#diagonalMove").html('Diagonal Move ❌').removeAttribute('class');
    }
}

function doStep() {
    if (currentCell === targetCell || openSet.length === 0) {
        toggleRun(false);
        return;
    }

    currentCell = findLowestMovementCost();
    removeElementFromArray(openSet, currentCell);
    closedSet.push(currentCell);

    for (let neighbor of currentCell.findNeighbors()) {
        if (neighbor.isObstacle || closedSet.includes(neighbor)) {
            continue;
        }

        let movementCostToNeighbor = currentCell.gCost + currentCell.calculateDistance(neighbor);
        if (movementCostToNeighbor >= neighbor.gCost && openSet.includes(neighbor)) {
            continue;
        }

        neighbor.gCost = movementCostToNeighbor;
        neighbor.hCost = neighbor.calculateDistance(targetCell);
        neighbor.parent = currentCell;

        if (openSet.includes(neighbor)) {
            continue;
        }
        openSet.push(neighbor);
    }

    traceLatestPath(currentCell);
    drawLayout();
}

function traceLatestPath(currentCell) {
    path = [];
    let cell = currentCell;
    path.push(cell);
    while (cell.parent) {
        path.push(cell);
        cell = cell.parent;
    }
    path.push(cell);
}

function drawLayout() {
    background(0, 0, 0);
    stroke(0);
    for (let y = 0; y < gridRows; y++) {
        for (let x = 0; x < gridColumns; x++) {
            grid[y][x].draw();
        }
    }
    drawPath();
}

function drawPath() {
    noFill();
    stroke(255);
    strokeWeight(cellWidth / 4);
    beginShape();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].y * cellWidth + cellWidth / 2, path[i].x * cellHeight + cellHeight / 2);
    }
    endShape();
}

function toggleRun(isRunning) {
    run = isRunning ? isRunning : !run;
    if (run) {
        select("#doRun").html('Stop 🤚').addClass('active');
    } else {
        select("#doRun").html('Run 🏃‍♂️').removeAttribute('class');
    }
}

function removeElementFromArray(array, element) {
    array.splice(array.indexOf(element), 1);
}

function findLowestMovementCost() {
    let lowest = openSet[0];
    for (let i = 1; i < openSet.length; i++) {
        let current = openSet[i];
        if (current.fCost() < lowest.fCost()) {
            lowest = current;
        }
        if (current.fCost() === lowest.fCost() && current.hCost < lowest.hCost) {
            lowest = current;
        }
    }
    return lowest;
}

function openGithub() {
    window.open('https://www.github.com/akbarhps', '_blank');
}