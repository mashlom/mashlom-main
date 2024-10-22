import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import * as sass from 'sass';

export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        api: 'modern-compiler' // or "modern"
      }
    }
  },
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