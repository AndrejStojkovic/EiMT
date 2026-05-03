import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config';

console.log("Token: " + process.env.TOKEN);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT),
  },
  define: {
    'process.env.TOKEN': JSON.stringify(process.env.TOKEN)
  }
})
