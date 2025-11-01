// const maze = [
// "110111111111101000001000000",
// "010101000000101011101111110",
// "011101111100101000101000000",
// "000001000100100111111111110",
// "111111111100101100000000011",
// "000001000000100101111111101",
// "011111110011100101000000000",
// "001001110000100101010101110",
// "111101011110111101010101000",
// "000101010010000001010101000",
// "000101010010101111010101111",
// "000101011110100001010100010",
// "011101010000100001010100010",
// "010101011111101111010111111",
// "011111010001111101010100000",
// "010100011101010101011100000",
// "010100010001010101000100000",
// "010111110001010101110111110",
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