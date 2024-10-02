import { player, gun } from './player.js';

export const bullets = [];
export const bulletSpeed = 5;
export const bulletSize = 5;

export const targets = [];
export const targetSize = 30;
export const targetSpeed = 2;
export const targetSpawnInterval = 2000; // Spawn a new target every 2 seconds

export function createBullet() {
    const angle = gun.angle;
    const speed = bulletSpeed;
    bullets.push({
        x: player.x + player.width / 2 + Math.cos(angle) * gun.width,
        y: player.y + player.height / 2 + Math.sin(angle) * gun.width,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed
    });
}

export function updateBullets(ctx) {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;

        // Remove bullets that are off-screen
        if (bullet.x < 0 || bullet.x > ctx.canvas.width || bullet.y < 0 || bullet.y > ctx.canvas.height) {
            bullets.splice(i, 1);
            continue;
        }

        // Draw bullet
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bulletSize, 0, Math.PI * 2);
        ctx.fill();
    }
}

export function spawnTarget() {
    const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let x, y, dx, dy;

    switch (side) {
        case 0: // top
            x = Math.random() * 800;
            y = -targetSize;
            dx = Math.random() * 2 - 1;
            dy = Math.random() * targetSpeed;
            break;
        case 1: // right
            x = 800 + targetSize;
            y = Math.random() * 600;
            dx = -Math.random() * targetSpeed;
            dy = Math.random() * 2 - 1;
            break;
        case 2: // bottom
            x = Math.random() * 800;
            y = 600 + targetSize;
            dx = Math.random() * 2 - 1;
            dy = -Math.random() * targetSpeed;
            break;
        case 3: // left
            x = -targetSize;
            y = Math.random() * 600;
            dx = Math.random() * targetSpeed;
            dy = Math.random() * 2 - 1;
            break;
    }

    targets.push({ x, y, dx, dy });
}

export function updateTargets(ctx) {
    for (let i = targets.length - 1; i >= 0; i--) {
        const target = targets[i];
        target.x += target.dx;
        target.y += target.dy;

        // Remove targets that are off-screen
        if (target.x < -targetSize || target.x > ctx.canvas.width + targetSize ||
            target.y < -targetSize || target.y > ctx.canvas.height + targetSize) {
            targets.splice(i, 1);
            continue;
        }

        // Draw target
        ctx.fillStyle = 'red';
        ctx.fillRect(target.x - targetSize / 2, target.y - targetSize / 2, targetSize, targetSize);
    }
}

export function checkCollisions() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        for (let j = targets.length - 1; j >= 0; j--) {
            const target = targets[j];
            const dx = bullet.x - target.x;
            const dy = bullet.y - target.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < bulletSize + targetSize / 2) {
                // Collision detected
                bullets.splice(i, 1);
                targets.splice(j, 1);
                break;
            }
        }
    }
}