"use strict";

// =============================================================
// main.js — LÓGICA DE INTERFAZ
// Controla qué panel se muestra en cada momento y gestiona
// los eventos del usuario. La lógica de cálculo y validación
// vive aquí de momento; en la siguiente fase se extraerá a un
// módulo independiente para poder testearse con Vitest.
// =============================================================

// Tabla de letras según el resto de dividir entre 23 (índices 0 a 22)
const LETTERS_BY_REMAINDER = [
  "T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B",
  "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E",
];

const MIN_DNI = 0;
const MAX_DNI = 99999999;

// --- Referencias a los paneles del HTML ---
// Cada panel representa un escenario del enunciado
const panelIntro    = document.getElementById("panel-intro");
const panelForm     = document.getElementById("panel-form");
const panelResult   = document.getElementById("panel-result");
const panelError    = document.getElementById("panel-error");
const panelFinished = document.getElementById("panel-finished");

// --- Referencias a los controles interactivos ---
const startButton     = document.getElementById("start-button");
const dniInput        = document.getElementById("dni-input");
const calculateButton = document.getElementById("calculate-button");
const restartButton   = document.getElementById("restart-button");

// --- Referencias a los elementos del resultado ---
const resultLetter = document.getElementById("result-letter");
const resultNumber = document.getElementById("result-number");

// =============================================================
// FUNCIONES DE UTILIDAD
// =============================================================

/**
 * Oculta todos los paneles usando el atributo nativo "hidden".
 * Es más accesible que display:none con clases porque saca el
 * elemento del árbol de accesibilidad de los lectores de pantalla.
 */
function hideAllPanels() {
  [panelIntro, panelForm, panelResult, panelError, panelFinished].forEach(
    (panel) => panel.setAttribute("hidden", "")
  );
}

/**
 * Valida que el dato introducido sea un número entre 0 y 99999999.
 * Rechaza vacíos, espacios y cualquier carácter no numérico.
 * @param {string} rawValue - Valor tal cual lo escribe el usuario
 * @returns {boolean}
 */
function isValidDni(rawValue) {
  if (!/^\d+$/.test(rawValue.trim())) {
    return false;
  }
  const numericValue = Number(rawValue);
  return numericValue >= MIN_DNI && numericValue <= MAX_DNI;
}

/**
 * Calcula la letra correspondiente al número de DNI.
 * Divide el número entre 23 y usa el resto como índice en la tabla.
 * @param {number} dniNumber
 * @returns {string} Letra resultante
 */
function calculateDniLetter(dniNumber) {
  const remainder = dniNumber % 23;
  return LETTERS_BY_REMAINDER[remainder];
}

// =============================================================
// MANEJADORES DE EVENTOS
// =============================================================

/**
 * Iniciar el sistema
 * El botón de inicio desaparece y se muestra el formulario.
 */
function handleStart() {
  hideAllPanels();
  panelForm.removeAttribute("hidden");
  dniInput.value = "";
  dniInput.focus();
}

/**
 * DNI válido / Número fuera de rango / Dato no numérico
 * Valida el dato y muestra el resultado o el error según corresponda.
 */
function handleCalculate() {
  const rawValue = dniInput.value;

  if (!isValidDni(rawValue)) {
    hideAllPanels();
    panelError.removeAttribute("hidden");
    return;
  }

  const dniNumber = Number(rawValue);
  const letter    = calculateDniLetter(dniNumber);

  // Se rellena el panel de resultado antes de mostrarlo
  resultNumber.textContent = String(dniNumber).padStart(8, "0");
  resultLetter.textContent = letter;

  hideAllPanels();
  panelResult.removeAttribute("hidden");
}

/**
 * Repetición del proceso
 * Vuelve al formulario para introducir un nuevo número.
 */
function handleRepeat() {
  hideAllPanels();
  panelForm.removeAttribute("hidden");
  dniInput.value = "";
  dniInput.focus();
}

/**
 * Cancelación del proceso
 * Muestra la pantalla de fin del programa.
 */
function handleCancel() {
  hideAllPanels();
  panelFinished.removeAttribute("hidden");
}

/**
 * Permite reiniciar la aplicación desde la pantalla de finalización.
 */
function handleRestart() {
  hideAllPanels();
  panelIntro.removeAttribute("hidden");
}

// =============================================================
// REGISTRO DE EVENTOS
// Usamos addEventListener en vez de
// onclick en el HTML, para mantener el JS separado del HTML.
// =============================================================

startButton.addEventListener("click", handleStart);
calculateButton.addEventListener("click", handleCalculate);
restartButton.addEventListener("click", handleRestart);

// Cubrimos todos los botones de "repetir" y "cancelar" con
// data-action para no depender de IDs concretos
document.querySelectorAll("[data-action='repeat']").forEach((button) => {
  button.addEventListener("click", handleRepeat);
});

document.querySelectorAll("[data-action='cancel']").forEach((button) => {
  button.addEventListener("click", handleCancel);
});

// Permitir pulsar Enter dentro del input para calcular,
// mejora la experiencia de usuario sin necesidad de ratón
dniInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleCalculate();
  }
});