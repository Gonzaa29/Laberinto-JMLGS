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
const tileSize = 160;

canvas.width = maze[0].length * tileSize;
canvas.height = maze.length * tileSize;

let player = { x: 1, y: 0 };
let enemy = { x: 1, y: 0 };
let goal = { x: 22, y: 17 };
let juegoActivo = true;
let persecucionActiva = false;

let caminoJugador = [{x: 1, y: 0}];
let indiceCamino = 0;

// Cargar imágenes
const virusImg = new Image();
virusImg.src = "imagenes/virus-principal.png";

const spaceshipImg = new Image();
spaceshipImg.src = "imagenes/nave-fondo.png";

const portalImg = new Image();
portalImg.src = "imagenes/portal.png";

// Variables para almacenar las dimensiones proporcionales de las imágenes
let virusDimensions = { width: tileSize, height: tileSize, offsetX: 0, offsetY: 0 };
let spaceshipDimensions = { width: tileSize, height: tileSize, offsetX: 0, offsetY: 0 };
let portalDimensions = { width: tileSize, height: tileSize, offsetX: 0, offsetY: 0 };

// Calcular dimensiones proporcionales para una imagen
function calcularDimensiones(img, maxSize) {
    const aspectRatio = img.width / img.height;
    const scale = 1.2; // Usa el 120% del espacio disponible (más grande que la casilla)
    let width, height, offsetX = 0, offsetY = 0;
    
    if (aspectRatio > 1) {
        // Imagen más ancha que alta
        width = maxSize * scale;
        height = (maxSize * scale) / aspectRatio;
        offsetX = (maxSize - width) / 2;
        offsetY = (maxSize - height) / 2;
    } else {
        // Imagen más alta que ancha
        height = maxSize * scale;
        width = (maxSize * scale) * aspectRatio;
        offsetX = (maxSize - width) / 2;
        offsetY = (maxSize - height) / 2;
    }
    
    return { width, height, offsetX, offsetY };
}

// Iniciar persecución después de 4 segundos
setTimeout(() => {
    persecucionActiva = true;
    console.log("¡La nave comenzó a perseguirte!");
    moverEnemigoPorCamino();
}, 4000);

// Dibujar laberinto
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            ctx.fillStyle = maze[y][x] === "1" ? "#000000ff" : "#ffffffff";
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    // Dibujar meta (portal)
    ctx.drawImage(
        portalImg,
        goal.x * tileSize + portalDimensions.offsetX,
        goal.y * tileSize + portalDimensions.offsetY,
        portalDimensions.width,
        portalDimensions.height
    );

    // Dibujar enemigo (nave espacial) solo si no está en la misma posición que el jugador
    if (enemy.x !== player.x || enemy.y !== player.y) {
        ctx.drawImage(
            spaceshipImg,
            enemy.x * tileSize + spaceshipDimensions.offsetX,
            enemy.y * tileSize + spaceshipDimensions.offsetY,
            spaceshipDimensions.width,
            spaceshipDimensions.height
        );
    }

    // Dibujar jugador (virus)
    ctx.drawImage(
        virusImg,
        player.x * tileSize + virusDimensions.offsetX,
        player.y * tileSize + virusDimensions.offsetY,
        virusDimensions.width,
        virusDimensions.height
    );
}

// Movimiento del jugador
function move(dx, dy) {
    if (!juegoActivo) return;

    let newX = player.x + dx;
    let newY = player.y + dy;

    if (maze[newY] && maze[newY][newX] === "1") {
        player.x = newX;
        player.y = newY;
        
        caminoJugador.push({x: player.x, y: player.y});
    }

    // Verificar si llegó a la meta
    if (player.x === goal.x && player.y === goal.y) {
        juegoActivo = false;
        mostrarMensaje("¡GANASTE!", true);
        return;
    }

    draw();
}

// Movimiento del enemigo siguiendo el camino del jugador
function moverEnemigoPorCamino() {
    if (!juegoActivo || !persecucionActiva) return;
    
    if (indiceCamino < caminoJugador.length - 1) {
        indiceCamino++;
        enemy.x = caminoJugador[indiceCamino].x;
        enemy.y = caminoJugador[indiceCamino].y;
        
        // Verificar colisión
        if (enemy.x === player.x && enemy.y === player.y) {
            juegoActivo = false;
            mostrarMensaje("¡PERDISTE!", false);
            return;
        }
        
        draw();
    }
    
    setTimeout(moverEnemigoPorCamino, 200);
}

// Mostrar mensaje de victoria o derrota
function mostrarMensaje(texto, esVictoria) {
    const mensajeContenido = document.querySelector("#mensaje-contenido");
    mensajeContenido.innerHTML = `
        <h2>${texto}</h2>
        <button id="boton-accion">${esVictoria ? 'SIGUIENTE NIVEL' : 'RESET'}</button>
    `;
    
    document.getElementById("mensaje-tiempo").style.display = "flex";
    
    document.getElementById("boton-accion").addEventListener("click", function() {
        if (esVictoria) {
            window.location.href = "nivel-4.html";
        } else {
            location.reload();
        }
    });
}

// Eventos de teclado
document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" || e.key === "w") move(0, -1);
    if (e.key === "ArrowDown" || e.key === "s") move(0, 1);
    if (e.key === "ArrowLeft" || e.key === "a") move(-1, 0);
    if (e.key === "ArrowRight" || e.key === "d") move(1, 0);
});

// Esperar a que las imágenes carguen y calcular sus dimensiones proporcionales
virusImg.onload = () => {
    virusDimensions = calcularDimensiones(virusImg, tileSize);
    
    spaceshipImg.onload = () => {
        spaceshipDimensions = calcularDimensiones(spaceshipImg, tileSize);
        
        portalImg.onload = () => {
            portalDimensions = calcularDimensiones(portalImg, tileSize);
            draw();
        };
    };
};

// Exportar función para que el HTML pueda llamarla cuando se acabe el tiempo
window.gameOver = function() {
    if (juegoActivo) {
        juegoActivo = false;
        mostrarMensaje("¡SE ACABÓ EL TIEMPO!", false);
    }
};