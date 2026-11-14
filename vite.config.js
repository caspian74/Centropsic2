import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite lista para Cloudflare Pages:
//   Build command:    npm run build
//   Output directory: dist
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Three.js y Leaflet se cargan con import() dinámico, así que ya
        // quedan en sus propios archivos. Aquí solo separamos lo compartido.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap', 'gsap/ScrollTrigger'],
        },
      },
    },
  },
});
