import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    },
    minify: false,  // Disable for debugging – re-enable with 'terser' after
    target: 'esnext'
  },
  preview: { port: 4173 }
});
