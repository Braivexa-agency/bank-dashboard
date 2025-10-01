import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react'
            if (id.includes('@tanstack')) return 'vendor-tanstack'
            if (id.includes('@radix-ui')) return 'vendor-radix'
            if (id.includes('lucide-react')) return 'vendor-icons'
            if (id.includes('clerk')) return 'vendor-clerk'
            return 'vendor'
          }
        },
      },
    },
  },
})
