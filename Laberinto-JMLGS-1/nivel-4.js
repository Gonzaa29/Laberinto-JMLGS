const maze = [
"010111100111101000001000000",
"010101000001101011101110000",
"011101111101101000101000000",
"000001000101001111111111110",
"111111111101101100000000010",
"000001000101100111111111100",
"011111110111100100000000000",
"001001110110100101010101110",
"111101010010111101010101000",
"010101011010100001010101000",
"010101010000101111010101111",
"010101010000101111110100010",
"010101010000100001010100010",
"010001010111101111010111111",
"011111010001111101010100000",
"010000011101010101011100000",
"010111111101010101000100000",
"010000000001010101100111110",

];

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 30;

canvas.width = maze[0].length * tileSize;
canvas.height = maze.length * tileSize;

let player = { x: 0, y: 0 };
let exit = { x: 20, y: 17 };

// Cargar imágenes
const virusImg = new Image();
virusImg.src = "images/virus-fondo.png";

const spaceshipImg = new Image();
spaceshipImg.src = "images/nave-fondo.png";

// Dibujar laberinto
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            ctx.fillStyle = maze[y][x] === "1" ? "#444" : "#111";
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    // Dibujar salida → nave espacial
    ctx.drawImage(spaceshipImg, exit.x * tileSize, exit.y * tileSize, tileSize, tileSize);

    // Dibujar jugador → virus
    ctx.drawImage(virusImg, player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

// Movimiento
function move(dx, dy) {
    let newX = player.x + dx;
    let newY = player.y + dy;

    if (maze[newY] && maze[newY][newX] === "1") {
        player.x = newX;
        player.y = newY;
    }

    if (player.x === exit.x && player.y === exit.y) {
        setTimeout(() => alert("¡Ganaste! 🚀"), 50);
    }

    draw();
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" || e.key === "w") move(0, -1);
    if (e.key === "ArrowDown" || e.key === "s") move(0, 1);
    if (e.key === "ArrowLeft" || e.key === "a") move(-1, 0);
    if (e.key === "ArrowRight" || e.key === "d") move(1, 0);
});

// Esperar a que las imágenes carguen antes de dibujar
virusImg.onload = () => {
    spaceshipImg.onload = () => {
        draw();
    };
};
