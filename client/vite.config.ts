import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "Transbabbler",
        short_name: "Transbabbler",
        start_url : "/",
        display: "standalone",
        background_color: "#0000",
        theme_color: "#F5A9B8",
        orientation: "portrait",
        icons: [
          
        ]
      },
      workbox: {
        navigateFallback: "/index.html",
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
})
