import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  define: {
    __CODEX_VERSION__: JSON.stringify('144:99'),
    __CATHEDRAL_VERSION__: JSON.stringify('2.0.0'),
    __LIVING_ARCANAE_COUNT__: 22,
    __FUSION_COMBINATIONS__: 231
  },
  optimizeDeps: {
    include: ['@cathedral/cathedral-game-engine']
  }
})
