const maze = [
"110111111111101000000000000",
"010100000000101011101000000",
"011101111100101000101000000",
"001001000100001111111111110",
"111011111100001100000000000",
"001001000100000101100000000",
"011011000111100101000000000",
"001001110010101110101011100",
"111101011111011110101011000",
"010101010001000010101010000",
"000101010001011110101011111",
"110101011110000001010100010",
"011101010000000001010100010",
"010101011111101111010111111",
"010111010011100101010000000",
"010100001110001101110000000",
"010100000010001001010000000",
"010111111110000001011100000",

];

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 30;

canvas.width = maze[0].length * tileSize;
canvas.height = maze.length * tileSize;

let player = { x: 18, y: 16 };
let exit = { x: 9, y: 20 };

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
