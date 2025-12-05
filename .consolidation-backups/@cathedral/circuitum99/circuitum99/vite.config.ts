/**
 * ⊙ Vite.Config
 * 
 * @alchemical Vite.Config
 * @element N/A
 * @symbol ⊙
 * 
 * @license CC0-1.0 - Public Domain
 */

import { defineConfig } from 'vite';

// Circuitum 99 - Alpha et Omega Deployment Configuration
// Optimized for performance and canonical production deployment

export default defineConfig({
  // Build optimization
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          vendor: ['react', 'react-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  
  // Development server
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom'
    ],
    exclude: []
  },
  
  // Environment variables
  define: {
    __CIRCUITUM_VERSION__: JSON.stringify('1.0.0-alpha-omega'),
    __DEPLOYMENT_DATE__: JSON.stringify(new Date().toISOString())
  }
});