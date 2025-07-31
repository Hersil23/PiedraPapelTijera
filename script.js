// Array con las opciones del juego
const opciones = ['piedra', 'papel', 'tijera'];

// Obtiene los elementos del DOM correspondientes a cada botón de opción
const botones = opciones.map(id => document.getElementById(id));

// Referencias a los elementos del DOM que muestran el conteo de resultados
const winsEl = document.getElementById('wins');
const lossesEl = document.getElementById('losses');
const drawsEl = document.getElementById('draws');
const historyList = document.getElementById('historyList');

// Variables para llevar el conteo de resultados y el historial
let victorias = 0;
let derrotas = 0;
let empates = 0;
let historial = [];
let rondasJugadas = 0;

/**
 * Función principal que se ejecuta al hacer clic en una opción.
 * Compara la elección del usuario con la de la computadora,
 * actualiza los contadores y el historial, y evalúa el ganador tras 5 rondas.
 * @param {string} usuario - Opción elegida por el usuario
 */
function jugar(usuario) {
  // Selección aleatoria de la computadora
  const computadora = opciones[Math.floor(Math.random() * 3)];

  // Determina el resultado de la ronda
  const resultado = obtenerResultado(usuario, computadora);

  // Muestra el resultado de la ronda en una alerta
  alert(`Tú elegiste: ${usuario}\nComputadora eligió: ${computadora}\nResultado: ${resultado.toUpperCase()}`);

  // Actualiza los contadores según el resultado
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

  // Incrementa el número de rondas jugadas
  rondasJugadas++;

  // Actualiza el historial visualmente
  actualizarHistorial(usuario, computadora, resultado);

  // Si se han jugado 5 rondas, se evalúa el ganador y se reinicia el juego
  if (rondasJugadas === 5) {
    evaluarGanador();
    reiniciarJuego();
  }
}

/**
 * Determina el resultado de una ronda según las reglas del juego.
 * @param {string} usuario - Opción del usuario
 * @param {string} computadora - Opción de la computadora
 * @returns {string} - Resultado: 'ganaste', 'perdiste' o 'empate'
 */
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

/**
 * Actualiza el historial de jugadas en pantalla.
 * Muestra las últimas 5 rondas en una lista.
 * @param {string} usuario - Opción del usuario
 * @param {string} computadora - Opción de la computadora
 * @param {string} resultado - Resultado de la ronda
 */
function actualizarHistorial(usuario, computadora, resultado) {
  const entrada = `Tú: ${usuario} | PC: ${computadora} → ${resultado}`;
  historial.unshift(entrada); // Añade al inicio del historial
  if (historial.length > 5) historial.pop(); // Mantiene solo las últimas 5 entradas

  // Limpia y actualiza la lista visual en el DOM
  historyList.innerHTML = '';
  historial.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    li.className = 'text-sm text-gray-700 dark:text-gray-300';
    historyList.appendChild(li);
  });
}

/**
 * Evalúa quién ganó el juego completo tras 5 rondas.
 * Muestra una alerta con el resultado global.
 */
function evaluarGanador() {
  if (victorias > derrotas) {
    alert(`🎉 ¡Has ganado el juego total con ${victorias} victorias!`);
  } else if (derrotas > victorias) {
    alert(`😢 La computadora ha ganado el juego total con ${derrotas} victorias.`);
  } else {
    alert(`🤝 El juego terminó en empate con ${empates} empates.`);
  }
}

/**
 * Reinicia todas las variables y elementos visuales para comenzar un nuevo juego.
 */
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

// Asigna el evento de clic a cada botón para iniciar una ronda con la opción correspondiente
botones.forEach(boton => {
  boton.addEventListener('click', () => jugar(boton.id));
});