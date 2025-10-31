const maze = [
"110101111111101110111111100",
"010111000000100011101110111",
"011100111101100000001000000",
"000001000101000111101111110",
"111011111101111100100000010",
"101001000100000101100000010",
"011011000111111101000000010",
"001001110010100101110101110",
"111101011110110101011101000",
"010101010011100001010101010",
"110101010010101111010101111",
"100101011110101001010100010",
"011101010001101001110100010",
"010101011111101111000111111",
"110111011001111101010100000",
"010100101101010100011111100",
"011111101011010101110100111",
"000000001001000111010111001",

];

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 30;

canvas.width = maze[0].length * tileSize;
canvas.height = maze.length * tileSize;

let player = { x: 2, y: 15 };
let exit = { x: 0, y: 1 };

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
