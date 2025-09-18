import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        // Copy only favicon and fonts, not images
        {
          src: 'favicon.*',
          dest: '.'
        },
        // No fonts to copy from public; handled by Vite from src/assets/fonts
      ]
    })
  ],
});
