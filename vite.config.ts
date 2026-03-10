import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          particles: ['@tsparticles/react', '@tsparticles/slim', '@tsparticles/engine'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
  },
});
