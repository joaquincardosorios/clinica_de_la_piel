import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Asegúrate de que Vite escuche en todas las interfaces
    port: 5173,        // Puedes cambiar el puerto si es necesario
  },
})
