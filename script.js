const opciones = ['piedra', 'papel', 'tijera'];
const botones = opciones.map(id => document.getElementById(id));
const winsEl = document.getElementById('wins');
const lossesEl = document.getElementById('losses');
const drawsEl = document.getElementById('draws');
const historyList = document.getElementById('historyList');

let victorias = 0;
let derrotas = 0;
let empates = 0;
let historial = [];
let rondasJugadas = 0;

function jugar(usuario) {
  const computadora = opciones[Math.floor(Math.random() * 3)];
  const resultado = obtenerResultado(usuario, computadora);

  alert(`Tú elegiste: ${usuario}\nComputadora eligió: ${computadora}\nResultado: ${resultado.toUpperCase()}`);

  if (resultado === 'ganaste') {
    victorias++;
    winsEl.textContent = victorias;
  } else if (resultado === 'perdiste') {
    derrotas++;
    lossesEl.textContent = derrotas;
  } else {
    empates++;
    drawsEl.textContent = empates;
  }

  rondasJugadas++;
  actualizarHistorial(usuario, computadora, resultado);

  if (rondasJugadas === 5) {
    evaluarGanador();
    reiniciarJuego();
  }
}

function obtenerResultado(usuario, computadora) {
  if (usuario === computadora) return 'empate';
  if (
    (usuario === 'piedra' && computadora === 'tijera') ||
    (usuario === 'papel' && computadora === 'piedra') ||
    (usuario === 'tijera' && computadora === 'papel')
  ) {
    return 'ganaste';
  }
  return 'perdiste';
}

function actualizarHistorial(usuario, computadora, resultado) {
  const entrada = `Tú: ${usuario} | PC: ${computadora} → ${resultado}`;
  historial.unshift(entrada);
  if (historial.length > 5) historial.pop();

  historyList.innerHTML = '';
  historial.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    li.className = 'text-sm text-gray-700 dark:text-gray-300';
    historyList.appendChild(li);
  });
}

function evaluarGanador() {
  if (victorias > derrotas) {
    alert(`🎉 ¡Has ganado el juego total con ${victorias} victorias!`);
  } else if (derrotas > victorias) {
    alert(`😢 La computadora ha ganado el juego total con ${derrotas} victorias.`);
  } else {
    alert(`🤝 El juego terminó en empate con ${empates} empates.`);
  }
}

function reiniciarJuego() {
  victorias = 0;
  derrotas = 0;
  empates = 0;
  rondasJugadas = 0;
  historial = [];

  winsEl.textContent = '0';
  lossesEl.textContent = '0';
  drawsEl.textContent = '0';
  historyList.innerHTML = '';
}

// Asignar eventos a los botones
botones.forEach(boton => {
  boton.addEventListener('click', () => jugar(boton.id));
});