// @ts-nocheck

/// <reference types="vitest" />
import '@testing-library/jest-dom';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    deps: {
      inline: ['@testing-library/vue', '@testing-library/jest-dom'],
    },
  },
});
