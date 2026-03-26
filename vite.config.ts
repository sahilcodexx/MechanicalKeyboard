import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

function copyRegistry() {
  return {
    name: 'copy-registry',
    closeBundle() {
      const src = path.resolve(__dirname, 'dist/r/keyboard.json')
      const dest = path.resolve(__dirname, 'dist/keyboard.json')
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), copyRegistry()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})