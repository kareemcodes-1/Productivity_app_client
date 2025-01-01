import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"


const BACKENDURL = import.meta.env.VITE_BACKEND_URL as string;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
       '/api': {
           target: BACKENDURL,
           changeOrigin: true,
       }
    }
  }
  
})
