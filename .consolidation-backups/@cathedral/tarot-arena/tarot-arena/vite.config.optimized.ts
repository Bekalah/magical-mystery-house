/**
 * 🃏 Tarot Arena - Optimized Vite Configuration
 * Interactive tarot gaming platform
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE || '/',
  
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@cathedral/brain': path.resolve(__dirname, '../../packages/brain/dist'),
      '@cathedral/soul': path.resolve(__dirname, '../../packages/soul/dist'),
      '@cathedral/labs': path.resolve(__dirname, '../../packages/labs/dist'),
      '@cathedral/shared': path.resolve(__dirname, '../../packages/shared/dist'),
      '@cathedral/crystals': path.resolve(__dirname, '../../packages/crystals/dist'),
      '@cathedral/liber-arcanae': path.resolve(__dirname, '../../packages/liber-arcanae/dist'),
    },
  },
  
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    target: 'esnext',
    sourcemap: mode !== 'production',
  },
  
  server: {
    port: 5175,
    host: true,
  },
  
  define: {
    __APP_NAME__: JSON.stringify('Tarot Arena'),
    __CATHEDRAL_VERSION__: JSON.stringify('2.0.0'),
    __ARCANA_COUNT__: 22,
  },
}));

