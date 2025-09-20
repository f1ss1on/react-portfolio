const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const { viteStaticCopy } = require('vite-plugin-static-copy');

// https://vite.dev/config/
module.exports = defineConfig({
  build: {
    outDir: process.env.BUILD_OUT_DIR ?? 'dist',
  },
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
