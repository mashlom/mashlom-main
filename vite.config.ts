import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // You can define manual chunks here if needed
        },
      },
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components')
    }
  }
});