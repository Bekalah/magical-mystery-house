import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@cathedral/brain': path.resolve(__dirname, '../../packages/brain/dist'),
      '@cathedral/soul': path.resolve(__dirname, '../../packages/soul/dist'),
      '@cathedral/labs': path.resolve(__dirname, '../../packages/labs/dist'),
      '@cathedral/shared': path.resolve(__dirname, '../../packages/shared/dist'),
      '@cathedral/crystals': path.resolve(__dirname, '../../packages/crystals/dist'),
    },
  },
});
