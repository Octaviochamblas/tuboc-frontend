import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Multipágina nativa de Vite: el manual es su propia entrada y reutiliza
    // index.css y los componentes del sitio. Sin router ni dependencias extra.
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        manual: resolve(__dirname, 'manual.html'),
        poc: resolve(__dirname, 'poc.html'),
      },
    },
  },
})
