// =============================================================
// dni-calculator.js — MÓDULO DE LÓGICA PURA
// Contiene únicamente las funciones de cálculo y validación
// del DNI, sin ninguna referencia al DOM ni al navegador.
// Al estar desacoplado de la interfaz, puede importarse y
// testearse de forma aislada con Vitest.
// =============================================================

// Tabla de letras según el resto de dividir entre 23 (índices 0 a 22)
export const LETTERS_BY_REMAINDER = [
  "T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B",
  "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E",
];

export const MIN_DNI = 0;
export const MAX_DNI = 99999999;

/**
 * Valida que el dato introducido sea un número entero entre 0 y 99999999.
 * Rechaza vacíos, espacios y cualquier carácter no numérico.
 * @param {string} rawValue - Valor tal cual lo escribe el usuario
 * @returns {boolean}
 */
export function isValidDni(rawValue) {
  if (!/^\d+$/.test(rawValue.trim())) {
    return false;
  }
  const numericValue = Number(rawValue);
  return numericValue >= MIN_DNI && numericValue <= MAX_DNI;
}

/**
 * Calcula la letra correspondiente al número de DNI.
 * Divide el número entre 23 y usa el resto como índice en la tabla.
 * @param {number} dniNumber - Número ya validado
 * @returns {string} Letra resultante
 */
export function calculateDniLetter(dniNumber) {
  const remainder = dniNumber % 23;
  return LETTERS_BY_REMAINDER[remainder];
}