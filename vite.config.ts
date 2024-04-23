import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], 
  ssr: {
    noExternal: ['@mui/utils', '@mui/x-charts']  
  },
  build: {
    target: 'esnext',  
    sourcemap: true    
  }
});