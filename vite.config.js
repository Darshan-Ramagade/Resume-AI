import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  
  // Path aliases (use @ instead of ../../..)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  
  // Dev server settings
  server: {
    port: 5173,
    open: true,  // Auto-open browser
  },
  
  // Build settings
  build: {
    outDir: 'dist',
    sourcemap: true,  // For debugging production builds
  },
})