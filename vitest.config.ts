import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8", // ou 'istanbul'
      reporter: ["text", "json", "html"], // gera relatórios em diferentes formatos
      thresholds: {
        lines: 80, // mínimo de 80% de cobertura de linhas
        functions: 80, // mínimo de 80% de cobertura de funções
        branches: 70, // mínimo de 70% de cobertura de ramificações (if/else)
        statements: 80,
      },
    },
  },
});
