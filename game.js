import { initMarket, updateMarket, updateMarketDisplay } from './economy.js';
import { checkCollisions, createBullet, spawnTarget, targetSpawnInterval, updateBullets, updateTargets } from './entities.js';
import { GameMap } from './gameMap.js';
import { addToInventory, drawGun, drawPlayer, movePlayer, updateInventoryDisplay } from './player.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Mouse position
const mouse = {
    x: 0,
    y: 0
};

// Keyboard state
const keys = {};

const gameMap = new GameMap();

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the map
    gameMap.draw(ctx);

    // Move and draw player
    movePlayer(keys, gameMap);
    drawPlayer(ctx);

    // Draw gun
    drawGun(ctx, mouse.x, mouse.y);

    // Update and draw bullets
    updateBullets(ctx);

    // Update and draw targets
    updateTargets(ctx);

    // Check collisions
    checkCollisions();

    // Draw mouse position indicator
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Update and display inventory
    updateInventoryDisplay();

    // Update and display market
    updateMarketDisplay();

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Keyboard input
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});

window.addEventListener('keyup', (e) => {
    delete keys[e.code];
});

// Mouse movement
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

// Mouse click (shooting)
canvas.addEventListener('click', createBullet);

// Initialize the market
initMarket();

// Start the game loop
gameLoop();

// Update market prices every 5 seconds
setInterval(updateMarket, 5000);

// Spawn targets at regular intervals
setInterval(spawnTarget, targetSpawnInterval);

// Add some initial inventory (for testing)
addToInventory('Weed', 10);
addToInventory('Cocaine', 5);