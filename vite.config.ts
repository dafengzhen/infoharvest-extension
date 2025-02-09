import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        newtab: resolve(__dirname, 'newtab.html'),
        options: resolve(__dirname, 'options.html'),
      },
    },
  },
  plugins: [react()],
});
