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
    const scale = 1.2;
    let width, height, offsetX = 0, offsetY = 0;
    
    if (aspectRatio > 1) {
        width = maxSize * scale;
        height = (maxSize * scale) / aspectRatio;
        offsetX = (maxSize - width) / 2;
        offsetY = (maxSize - height) / 2;
    } else {
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
            if (maze[y][x] === "0") {
                ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
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
        
        // Verificar victoria
        if (player.x === goal.x && player.y === goal.y) {
            juegoActivo = false;
            draw();
            mostrarMensaje("¡GANASTE!", true);
            return;
        }
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
        
        draw();
        
        // Verificar colisión
        if (enemy.x === player.x && enemy.y === player.y) {
            juegoActivo = false;
            mostrarMensaje("¡PERDISTE!", false);
            return;
        }
    }
    
    setTimeout(moverEnemigoPorCamino, 200);
}

// Mostrar mensaje de victoria o derrota
function mostrarMensaje(texto, esVictoria) {
    setTimeout(() => {
        const mensajeTiempo = document.getElementById("mensaje-tiempo");
        const mensajeContenido = document.getElementById("mensaje-contenido");
        
        if (!mensajeTiempo || !mensajeContenido) {
            console.error("No se encontraron los elementos del mensaje");
            // Fallback a alert
            if (esVictoria) {
                if (confirm(texto + " ¿Ir al siguiente nivel?")) {
                    window.location.href = "nivel-4.html";
                } else {
                    location.reload();
                }
            } else {
                if (confirm(texto + " ¿Reintentar?")) {
                    location.reload();
                }
            }
            return;
        }
        
        mensajeContenido.innerHTML = `
            <h2>${texto}</h2>
            <button id="boton-accion">${esVictoria ? 'SIGUIENTE NIVEL' : 'RESET'}</button>
        `;
        
        mensajeTiempo.style.display = "flex";
        
        const botonAccion = document.getElementById("boton-accion");
        if (botonAccion) {
            botonAccion.addEventListener("click", function() {
                if (esVictoria) {
                    window.location.href = "nivel-4.html";
                } else {
                    location.reload();
                }
            });
        }
    }, 100);
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