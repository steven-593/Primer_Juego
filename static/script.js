document.addEventListener("DOMContentLoaded", () => {
    const celdas = document.querySelectorAll(".celda");
    const mensaje = document.getElementById("mensaje");
    const reiniciarBtn = document.getElementById("reiniciar");

    // 🎵 Cargar sonidos
    const sonidoClick = new Audio("/static/sounds/click.mp3");
    const sonidoWin = new Audio("/static/sounds/win.mp3");
    const sonidoDraw = new Audio("/static/sounds/draw.mp3");

    let turno = "X";
    let tablero = ["", "", "", "", "", "", "", "", ""];
    let juegoActivo = true;

    const combinacionesGanadoras = [
        [0,1,2], [3,4,5], [6,7,8], // filas
        [0,3,6], [1,4,7], [2,5,8], // columnas
        [0,4,8], [2,4,6]           // diagonales
    ];

    function chequearGanador() {
        for (let combinacion of combinacionesGanadoras) {
            const [a, b, c] = combinacion;
            if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
                juegoActivo = false;
                mensaje.textContent = `🎉 Ganó ${tablero[a]}!`;
                sonidoWin.play(); // 🔊 reproducir victoria
                return;
            }
        }
        if (!tablero.includes("")) {
            juegoActivo = false;
            mensaje.textContent = "😮 Empate!";
            sonidoDraw.play(); // 🔊 reproducir empate
        }
    }

    function manejarClick(e) {
        const index = e.target.dataset.index;
        if (!juegoActivo || tablero[index] !== "") return;

        tablero[index] = turno;
        e.target.textContent = turno;

        sonidoClick.play(); // 🔊 sonido al marcar

        chequearGanador();

        turno = turno === "X" ? "O" : "X";
        if (juegoActivo) {
            mensaje.textContent = `Turno de ${turno}`;
        }
    }

    function reiniciarJuego() {
        tablero.fill("");
        juegoActivo = true;
        turno = "X";
        celdas.forEach(c => c.textContent = "");
        mensaje.textContent = "Turno de X";
    }

    celdas.forEach(celda => celda.addEventListener("click", manejarClick));
    reiniciarBtn.addEventListener("click", reiniciarJuego);
});
