/**
 * Akbar Hasadi Putra Siregar
 * 6/21/2021 04:07 PM
 * https://www.github.com/akbarhps
 */

function Cell(y, x, obstacleChance = 0.4) {
    this.y = y;
    this.x = x;
    this.isObstacle = Math.random() < obstacleChance;

    this.gCost = 0;
    this.hCost = 0;
    this.fCost = () => {
        return this.gCost + this.hCost;
    }

    this.parent = undefined;

    this.findNeighbors = () => {
        let neighbors = [];
        const y = this.y;
        const x = this.x;
        if (y < gridRows - 1) {
            neighbors.push(grid[y + 1][x]);
        }
        if (y > 0) {
            neighbors.push(grid[y - 1][x]);
        }
        if (x < gridColumns - 1) {
            neighbors.push(grid[y][x + 1]);
        }
        if (x > 0) {
            neighbors.push(grid[y][x - 1]);
        }
        if (diagonalMove && y > 0 && x > 0) {
            neighbors.push(grid[y - 1][x - 1]);
        }
        if (diagonalMove && y < gridRows - 1 && x > 0) {
            neighbors.push(grid[y + 1][x - 1]);
        }
        if (diagonalMove && y > 0 && x < gridColumns - 1) {
            neighbors.push(grid[y - 1][x + 1]);
        }
        if (diagonalMove && y < gridRows - 1 && x < gridColumns - 1) {
            neighbors.push(grid[y + 1][x + 1]);
        }
        return neighbors;
    }

    this.calculateDistance = (to) => {
        let distX = Math.abs(this.x - to.x);
        let distY = Math.abs(this.y - to.y);
        if (distX > distY) return 14 * distY + 10 * (distX - distY);
        else return 14 * distX + 10 * (distY - distX);
    }

    this.draw = () => {
        strokeWeight(1);
        fill(255, 255, 255, 200);
        if (this.isObstacle) {
            fill(0);
        }
        if (openSet.includes(this)) {
            fill(0, 100, 0);
        }
        if (closedSet.includes(this)) {
            fill(100, 0, 0);
        }
        if (startCell === this || targetCell === this) {
            fill(128, 128, 128);
        }
        rect(this.y * cellWidth, this.x * cellHeight, cellWidth, cellHeight);
    };
}