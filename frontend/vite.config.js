import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Specify output directory
    emptyOutDir: true,  // Clear the directory on each build
    rollupOptions: {
      // Additional options can be set here if needed
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
});