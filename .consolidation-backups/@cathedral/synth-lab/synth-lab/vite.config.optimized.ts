/**
 * 🎵 Synth Lab - Optimized Vite Configuration
 * Audio synthesis studio with Tone.js
 */

/**
 * ⊙ Vite.Config.Optimized
 * 
 * @alchemical Vite.Config.Optimized
 * @element N/A
 * @symbol ⊙
 * 
 * @license CC0-1.0 - Public Domain
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
      '@cathedral/synth': path.resolve(__dirname, '../../packages/synth/dist'),
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
          'tone-vendor': ['tone'],
        },
      },
    },
    target: 'esnext',
    sourcemap: mode !== 'production',
  },
  
  server: {
    port: 5174,
    host: true,
  },
  
  define: {
    __APP_NAME__: JSON.stringify('Synth Lab'),
    __CATHEDRAL_VERSION__: JSON.stringify('2.0.0'),
  },
}));

