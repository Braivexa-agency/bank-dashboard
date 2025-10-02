import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // If you're using recharts (common in dashboards)
          'charts': ['recharts'],
          
          // If you're using UI libraries
          // 'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          
          // If you're using date libraries
          // 'date-vendor': ['date-fns', 'dayjs'],
          
          // If you're using form libraries
          // 'form-vendor': ['react-hook-form', 'zod'],
          
          // If you're using state management
          // 'state-vendor': ['zustand', 'redux', '@reduxjs/toolkit'],
        },
      },
    },
    // Increase chunk size warning limit (optional)
    chunkSizeWarningLimit: 100000,
    
    // Enable minification (default is 'esbuild', which is faster)
    minify: 'esbuild',
    
    // Or if you prefer terser for better compression:
    // minify: 'terser',
  },
})