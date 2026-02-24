import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@scootify/shared': path.resolve(__dirname, 'src'),
      '@scootify/shared/*': path.resolve(__dirname, 'src/*'),
    },
  },
  test: {
    include: ['src/**/*.test.ts', 'src/firebase/**/*.test.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json'],
      include: ['src/lib/**', 'src/config/**', 'src/data/**'],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
});
