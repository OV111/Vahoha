
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // or "./" if no src
    },
  },
  // gsap ships CJS/ESM interop that breaks when Node loads it externally;
  // bundling it keeps the build-time prerender working.
  ssr: { noExternal: ["gsap"] },
  // The challenge test runner worker loads sucrase on demand (TypeScript mode).
  // A dynamic import inside a worker needs ES output; the default (iife) cannot split code.
  worker: { format: "es" },
  build: {
    cssMinify: true,
    rollupOptions: {
      // Vendor splitting is client-only; the SSR prerender build keeps deps external.
      output: isSsrBuild ? {} : {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-gsap": ["gsap"],
          "vendor-icons": ["react-icons"],
          "vendor-toast": ["sonner"],
          "vendor-forms": ["react-hook-form"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
