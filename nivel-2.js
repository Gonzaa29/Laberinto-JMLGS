const maze = [
"000001101000001101011100000",
"011101101011101001011101110",
"011000101101011011011101010",
"001110100101001010001001110",
"110111110101011110111011000",
"000001011111010010100001111",
"011101010001110010101111000",
"010101111101001010010101010",
"010101000001111011101001010",
"000101111100000000001010100",
"111101000001111101000101010",
"010001111101000101111101010",
"111111111101000100001001010",
"000101000001001100101111110",
"111101111011100100101111100",
"000100001010000000001010110",
"111111101010111111101010110",
"000000001110111111100010000",
];


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 80; // AUMENTADO de 30 a 50

canvas.width = maze[0].length * tileSize;
canvas.height = maze.length * tileSize;

let player = { x: 1, y: 0 };
let exit = { x: 22, y: 17 };

// Cargar imágenes
const virusImg = new Image();
virusImg.src = "imagenes/virus-principal.png";

const spaceshipImg = new Image();
spaceshipImg.src = "imagenes/nave-fondo.png";

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
}