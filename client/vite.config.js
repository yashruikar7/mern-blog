import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react()],
});


// Proxies are used to redirect API calls from your frontend development server to another server, 
// This means any request to /api on your frontend development server will be forwarded to http://localhost:3000/api.