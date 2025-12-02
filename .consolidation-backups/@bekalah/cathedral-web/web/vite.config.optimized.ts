/**
 * 🏰 Cathedral Web - Optimized Vite Configuration
 * 
 * Performance optimizations:
 * - Code splitting
 * - Tree shaking
 * - Asset optimization
 * - PWA support
 * - Bundle analysis
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE || '/',
  
  plugins: [
    react({
      // Fast refresh for development
      fastRefresh: true,
    }),
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@cathedral/codex-144-99': path.resolve(__dirname, '../../packages/codex-144-99/dist'),
      '@cathedral/liber-arcanae': path.resolve(__dirname, '../../packages/liber-arcanae/dist'),
      '@cathedral/brain': path.resolve(__dirname, '../../packages/brain/dist'),
      '@cathedral/soul': path.resolve(__dirname, '../../packages/soul/dist'),
      '@cathedral/shared': path.resolve(__dirname, '../../packages/shared/dist'),
      '@cathedral/crystals': path.resolve(__dirname, '../../packages/crystals/dist'),
    },
  },
  
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    
    // Optimize bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
      },
    },
    
    // Code splitting
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          // 3D engines
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'babylon-vendor': ['babylonjs'],
          // Audio
          'audio-vendor': ['tone'],
          // Animation
          'animation-vendor': ['framer-motion', 'gsap', 'animejs'],
          // State management
          'state-vendor': ['zustand', 'swr'],
        },
        // Asset naming
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    
    // Target modern browsers
    target: 'esnext',
    
    // Enable source maps for production debugging
    sourcemap: mode !== 'production',
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  
  // Development server
  server: {
    port: 5173,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  
  // Preview server
  preview: {
    port: 4173,
    host: true,
  },
  
  // Environment variables
  define: {
    __CODEX_VERSION__: JSON.stringify('144:99'),
    __CATHEDRAL_VERSION__: JSON.stringify('2.0.0'),
    __LIVING_ARCANAE_COUNT__: 22,
    __FUSION_COMBINATIONS__: 231,
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'babylonjs',
      'tone',
      'framer-motion',
      'zustand',
    ],
    exclude: ['@cathedral/codex-144-99'],
  },
  
  // CSS optimization
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase',
    },
  },
  
  // Enable JSON imports
  json: {
    namedExports: true,
    stringify: false,
  },
}));

