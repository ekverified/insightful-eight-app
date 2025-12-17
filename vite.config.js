import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'  // Processes HTML, bundles /src/app.js to /assets/app-[hash].js if using modules
    },
    minify: 'terser',  // Uses Terser for safe JS minification (install via npm i -D terser)
    target: 'esnext',  // Modern browser support
    cssCodeSplit: false,  // Inline CSS for single-file optimization
    emptyOutDir: true  // Clean dist folder on build
  },
  preview: {
    port: 4173  // Local preview server port
  },
  // Optional: PWA support (add vite-plugin-pwa for full manifest/SW handling)
  // plugins: [vitePWA({ registerType: 'autoUpdate' })],  // Uncomment after npm i -D vite-plugin-pwa
  define: {
    global: 'globalThis'  // Fix global scope in modules
  }
});
