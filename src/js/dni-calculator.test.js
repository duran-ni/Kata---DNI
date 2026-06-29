// =============================================================
// TESTS UNITARIOS siguiendo TDD.
// Cada describe agrupa los tests de una misma funcionalidad,
// y cada it describe un comportamiento concreto esperado.
// =============================================================

import { describe, it, expect } from "vitest";
import {
  isValidDni,
  calculateDniLetter,
  MIN_DNI,
  MAX_DNI,
} from "./dni-calculator.js";

// -------------------------------------------------------------
// DNI válido
// -------------------------------------------------------------
describe("isValidDni — números válidos", () => {
  it("debería devolver true para el número mínimo permitido (0)", () => {
    expect(isValidDni("0")).toBe(true);
  });

  it("debería devolver true para el número máximo permitido (99999999)", () => {
    expect(isValidDni("99999999")).toBe(true);
  });

  it("debería devolver true para un número de 8 cifras cualquiera", () => {
    expect(isValidDni("12345678")).toBe(true);
  });

  it("debería devolver true para un número con ceros a la izquierda", () => {
    expect(isValidDni("00000001")).toBe(true);
  });
});

// -------------------------------------------------------------
// Número fuera de rango
// -------------------------------------------------------------
describe("isValidDni — números fuera de rango", () => {
  it("debería devolver false para un número mayor que 99999999", () => {
    expect(isValidDni("100000000")).toBe(false);
  });

  it("debería devolver false para un número negativo", () => {
    expect(isValidDni("-1")).toBe(false);
  });
});

// -------------------------------------------------------------
// Dato no numérico
// -------------------------------------------------------------
describe("isValidDni — datos no numéricos", () => {
  it("debería devolver false para letras", () => {
    expect(isValidDni("abc")).toBe(false);
  });

  it("debería devolver false para una cadena vacía", () => {
    expect(isValidDni("")).toBe(false);
  });

  it("debería devolver false para espacios en blanco", () => {
    expect(isValidDni("   ")).toBe(false);
  });

  it("debería devolver false para una combinación de números y letras", () => {
    expect(isValidDni("123abc")).toBe(false);
  });

  it("debería devolver false para un número decimal", () => {
    expect(isValidDni("12.34")).toBe(false);
  });
});

// -------------------------------------------------------------
// Cálculo de la letra (DNI válido)
// -------------------------------------------------------------
describe("calculateDniLetter — cálculo correcto de la letra", () => {
  it("debería devolver Z para 12345678", () => {
    expect(calculateDniLetter(12345678)).toBe("Z");
  });

  it("debería devolver T para 0 (resto 0)", () => {
    expect(calculateDniLetter(0)).toBe("T");
  });

  it("debería devolver R para 1 (resto 1)", () => {
    expect(calculateDniLetter(1)).toBe("R");
  });

  it("debería devolver E para el resto 22 (último de la tabla)", () => {
    expect(calculateDniLetter(22)).toBe("E");
  });

  it("debería devolver T para 23 (vuelve al inicio de la tabla)", () => {
    expect(calculateDniLetter(23)).toBe("T");
  });
});

// -------------------------------------------------------------
// Constantes
// -------------------------------------------------------------
describe("constantes MIN_DNI y MAX_DNI", () => {
  it("MIN_DNI debería ser 0", () => {
    expect(MIN_DNI).toBe(0);
  });

  it("MAX_DNI debería ser 99999999", () => {
    expect(MAX_DNI).toBe(99999999);
  });
});