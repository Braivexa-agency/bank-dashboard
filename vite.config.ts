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
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react'
            if (id.includes('@tanstack')) return 'vendor-tanstack'
            if (id.includes('@radix-ui')) return 'vendor-radix'
            if (id.includes('lucide-react') || id.includes('@tabler')) return 'vendor-icons'
            if (id.includes('clerk')) return 'vendor-clerk'
            if (id.includes('zod') || id.includes('react-hook-form')) return 'vendor-forms'
            return 'vendor'
          }
        },
      },
    },
  },
})
