// const maze = [
// "101101100111101000001000000",
// "101001000001101011101111110",
// "111111111101101000100100000",
// "000000000100101010111111111",
// "111111111101101110100000001",
// "000001000101101111111111111",
// "011111101001101000000000000",
// "000001110110111101010101110",
// "111101010100111101010101010",
// "010101011110100001010100100",
// "010101010100101111010101111",
// "010101010110111111101010000",
// "010101010000100000010101111",
// "010001011111101110101011111",
// "011111010001101100010101000",
// "010000010000001010111111110",
// "010111111101111110101111110",
// "010000000001010111000000000",
// ];

// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");
// const tileSize = 80; // AUMENTADO de 30 a 50

// canvas.width = maze[0].length * tileSize;
// canvas.height = maze.length * tileSize;

// let player = { x: 1, y: 0 };
// let exit = { x: 22, y: 17 };

// // Cargar imágenes
// const virusImg = new Image();
// virusImg.src = "imagenes/virus-principal.png";

// const spaceshipImg = new Image();
// spaceshipImg.src = "imagenes/nave-fondo.png";

// // Dibujar laberinto
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     for (let y = 0; y < maze.length; y++) {
//         for (let x = 0; x < maze[y].length; x++) {
//             ctx.fillStyle = maze[y][x] === "1" ? "#444" : "#111";
//             ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
//         }
//     }

//     // Dibujar salida → nave espacial
//     ctx.drawImage(spaceshipImg, exit.x * tileSize, exit.y * tileSize, tileSize, tileSize);

//     // Dibujar jugador → virus
//     ctx.drawImage(virusImg, player.x * tileSize, player.y * tileSize, tileSize, tileSize);
// }

// // Movimiento
// function move(dx, dy) {
//     let newX = player.x + dx;
//     let newY = player.y + dy;

//     if (maze[newY] && maze[newY][newX] === "1") {
//         player.x = newX;
//         player.y = newY;
//     }

//     if (player.x === exit.x && player.y === exit.y) {
//         setTimeout(() => alert("¡Ganaste! 🚀"), 50);
//     }

//     draw();
// }

// document.addEventListener("keydown", e => {
//     if (e.key === "ArrowUp" || e.key === "w") move(0, -1);
//     if (e.key === "ArrowDown" || e.key === "s") move(0, 1);
//     if (e.key === "ArrowLeft" || e.key === "a") move(-1, 0);
//     if (e.key === "ArrowRight" || e.key === "d") move(1, 0);
// });

// // Esperar a que las imágenes carguen antes de dibujar
// virusImg.onload = () => {
//     spaceshipImg.onload = () => {
//         draw();
//     };
// }