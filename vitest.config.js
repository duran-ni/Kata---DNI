import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Indica a Vitest dónde buscar los archivos de test
    include: ["src/**/*.test.js"],
  },
});