const GRID_SIZE = 20;
const CELL_SIZE = 800 / GRID_SIZE;

export class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.grid = this.generateTerrain();
    }

    generateTerrain() {
        const grid = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            grid[y] = [];
            for (let x = 0; x < GRID_SIZE; x++) {
                grid[y][x] = Math.random() < 0.3 ? 1 : 0; // 30% chance of obstacle
            }
        }
        return grid;
    }

    ensurePath(startX, startY, endX, endY) {
        const queue = [[startX, startY]];
        const visited = new Set();
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        let iterations = 0;
        const maxIterations = GRID_SIZE * GRID_SIZE; // Set a maximum number of iterations

        while (queue.length > 0 && iterations < maxIterations) {
            iterations++;
            const [x, y] = queue.shift();
            if (x === endX && y === endY) return;

            for (const [dx, dy] of directions) {
                const newX = x + dx;
                const newY = y + dy;
                if (newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
                    const key = `${newX},${newY}`;
                    if (!visited.has(key)) {
                        visited.add(key);
                        if (this.grid[newY][newX] === 1) {
                            this.grid[newY][newX] = 0;
                        }
                        queue.push([newX, newY]);
                    }
                }
            }
        }

        // If we've reached the maximum iterations, ensure a direct path
        if (iterations >= maxIterations) {
            this.createDirectPath(startX, startY, endX, endY);
        }
    }

    createDirectPath(startX, startY, endX, endY) {
        const dx = endX - startX;
        const dy = endY - startY;
        const steps = Math.max(Math.abs(dx), Math.abs(dy));
        for (let i = 0; i <= steps; i++) {
            const x = Math.round(startX + (i / steps) * dx);
            const y = Math.round(startY + (i / steps) * dy);
            if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
                this.grid[y][x] = 0;
            }
        }
    }

    draw(ctx, offsetX, offsetY) {
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                if (this.grid[y][x] === 1) {
                    ctx.fillStyle = 'brown';
                    ctx.fillRect(
                        this.x * 800 + x * CELL_SIZE - offsetX,
                        this.y * 800 + y * CELL_SIZE - offsetY,
                        CELL_SIZE,
                        CELL_SIZE
                    );
                }
            }
        }
    }
}