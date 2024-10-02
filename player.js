export const player = {
    x: 400, // Half of canvas width
    y: 300, // Half of canvas height
    width: 32,
    height: 32,
    speed: 1,
    inventory: {}
};

export const gun = {
    width: 40,
    height: 12,
    angle: 0
};

export function movePlayer(keys, gameMap) {
    const oldX = player.x;
    const oldY = player.y;
    if (keys['ArrowLeft'] || keys['KeyA']) player.x -= player.speed;
    if (keys['ArrowRight']|| keys['KeyD']) player.x += player.speed;
    if (keys['ArrowUp'] || keys['KeyW']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['KeyS']) player.y += player.speed;

    // Check collision with obstacles
    const currentTile = gameMap.getTile(gameMap.currentTile.x, gameMap.currentTile.y);
    const cellX = Math.floor(player.x / (800 / 20));
    const cellY = Math.floor(player.y / (800 / 20));
    if (cellX >= 0 && cellX < 20 && cellY >= 0 && cellY < 20) {
        if (currentTile.grid[cellY][cellX] === 1) {
            player.x = oldX;
            player.y = oldY;
        }
    }

    // Check if player is switching tiles
    if (player.x < 0) {
        gameMap.currentTile.x--;
        player.x = 800 - player.width;
    } else if (player.x + player.width > 800) {
        gameMap.currentTile.x++;
        player.x = 0;
    }
    if (player.y < 0) {
        gameMap.currentTile.y--;
        player.y = 600 - player.height;
    } else if (player.y + player.height > 600) {
        gameMap.currentTile.y++;
        player.y = 0;
    }
}

export function drawPlayer(ctx) {
    ctx.fillStyle = '#0f0';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

export function drawGun(ctx, mouseX, mouseY) {
    gun.angle = Math.atan2(mouseY - (player.y + player.height / 2), mouseX - (player.x + player.width / 2));
    
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
    ctx.rotate(gun.angle);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, -gun.height / 2, gun.width, gun.height);
    ctx.restore();
}

export function addToInventory(item, amount) {
    if (player.inventory[item]) {
        player.inventory[item] += amount;
    } else {
        player.inventory[item] = amount;
    }
}

export function updateInventoryDisplay() {
    const inventoryElement = document.getElementById('inventory');
    inventoryElement.innerHTML = '<h3>Inventory</h3>';
    for (const [item, amount] of Object.entries(player.inventory)) {
        inventoryElement.innerHTML += `${item}: ${amount}<br>`;
    }
}