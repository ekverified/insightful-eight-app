import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  // Detect deploy platform (via env or mode)
  const isGitHubPages = mode === 'production' && !process.env.RENDER;  // Adjust if needed
  return {
    base: isGitHubPages ? '/insightful-eight-app/' : '/',  // Subpath for GitHub, root for Render/Vercel
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: 'index.html'
      },
      minify: 'terser',  // Safe with Terser installed
      target: 'esnext',
      assetsInlineLimit: 0  // Ensure icons/manifest copy as files (no inlining)
    },
    preview: { port: 4173 }
  };
});
