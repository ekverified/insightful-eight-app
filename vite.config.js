import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    },
    minify: 'terser',  // Ensures safe minification without DOCTYPE stripping
    target: 'esnext',  // Modern browsers
    cssCodeSplit: false  // Bundle CSS inline to avoid MIME issues
  },
  preview: {
    port: 4173
  },
  define: {
    global: 'globalThis'  // Fix any global scope quirks
  }
});
