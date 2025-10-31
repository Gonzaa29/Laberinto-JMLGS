nivel 1 html <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nivel 1</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="contenedor">
        <div id="fondo-base-contenedor">
            <img src="imagenes/fondo-base.png" alt="fondo base" id="fondo-base">
            <div>
                <button id="flecha-atras" onclick="goBack()">
                    <svg width="20px" height="20px" viewBox="0 0 13 10">
                        <path d="M12,5 L1,5"></path>
                        <polyline points="5 1 1 5 5 9"></polyline>
                    </svg>
                </button>
                <script>
                document.getElementById("flecha-atras").addEventListener("click", function() {
                    window.location.href = "niveles.html";
                    
                });
                
                </script>
                <canvas id="gameCanvas"></canvas>
<p>Usa flechas o WASD para moverte y llega a la nave espacial.</p>

<script src="nivel-1.js"></script>
            </div>
        </div>
        <!-- <div>
            <button id="pixel-button">LET'S PLAY!</button>
            <script>
            document.getElementById("pixel-button").addEventListener("click", function() {
                window.location.href = "niveles.html";
            });
            </script>
        </div> -->
    </div>
</body>
</html> 



js n1
const maze = [
"010000000000000001110111111",
"010111011010110101110110100",
"010001011010010101010110101",
"010100001011110101010010101",
"011111101010010101011010101",
"000000101011010101011110101",
"111111101010010101010010101",
"100000111011010101010010101",
"101111100000011101010000001",
"100000000011110100010111101",
"111111101000010111110100101",
"100000001011110110000110111",
"111111101000010111110110011",
"100000001110110111010011001",
"101111101010110000011111001",
"101111101000111111010001000",
"100000001011111111010001110",
"111111111110000000010111110"
];

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 30;

canvas.width = maze[0].length * tileSize;
canvas.height = maze.length * tileSize;

let player = { x: 1, y: 0 };
let exit = { x: 22, y: 17 };

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

