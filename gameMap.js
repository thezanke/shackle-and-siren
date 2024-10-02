import { player } from './player.js';
import { Tile } from './tile.js';

const TILE_SIZE = 800;
const GRID_SIZE = 20;
const CELL_SIZE = TILE_SIZE / GRID_SIZE;

export class GameMap {
    constructor() {
        this.tiles = new Map();
        this.currentTile = { x: 0, y: 0 };
        this.getTile(0, 0);
    }

    getTile(x, y) {
        const key = `${x},${y}`;
        if (!this.tiles.has(key)) {
            const newTile = new Tile(x, y);
            if (x !== 0 || y !== 0) {
                const startX = x > this.currentTile.x ? 0 : (x < this.currentTile.x ? GRID_SIZE - 1 : Math.floor(player.x / CELL_SIZE));
                const startY = y > this.currentTile.y ? 0 : (y < this.currentTile.y ? GRID_SIZE - 1 : Math.floor(player.y / CELL_SIZE));
                const endX = x > this.currentTile.x ? GRID_SIZE - 1 : (x < this.currentTile.x ? 0 : startX);
                const endY = y > this.currentTile.y ? GRID_SIZE - 1 : (y < this.currentTile.y ? 0 : startY);
                newTile.ensurePath(startX, startY, endX, endY);
            }
            this.tiles.set(key, newTile);
        }
        return this.tiles.get(key);
    }

    draw(ctx) {
        const offsetX = this.currentTile.x * TILE_SIZE;
        const offsetY = this.currentTile.y * TILE_SIZE;
        
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                const tile = this.getTile(this.currentTile.x + dx, this.currentTile.y + dy);
                tile.draw(ctx, offsetX, offsetY);
            }
        }
    }
}