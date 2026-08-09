// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standalone deploy — this site lives at the root of its own webserver,
// so the build always uses base=/ (vite's default). BASE_URL is wired
// into BrowserRouter via import.meta.env.BASE_URL in src/main.jsx.
export default defineConfig({
  plugins: [react()],
  // Build straight to build/ — dist/ is reserved for packaging output
  // (wcc.zip), not the raw build artifacts.
  build: {
    outDir: 'build',
  },
  // Vite's built-in asset-extension check is case-sensitive and only
  // matches lowercase "jpg"/"jpeg" — uppercase-extension image files
  // otherwise get treated as JS modules and fail import analysis.
  assetsInclude: ['**/*.JPG', '**/*.JPEG'],
  // Required for React Router BrowserRouter: serve index.html for all routes during dev
  server: {
    historyApiFallback: true,
  },
  // Required for Vite preview server too
  preview: {
    historyApiFallback: true,
  },
});
