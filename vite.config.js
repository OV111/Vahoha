
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonts every page renders above the fold. The browser only finds them after
// it has downloaded and parsed the CSS; a preload starts them in parallel.
// Names are hashed at build time, so the tags are added from the final bundle.
const PRELOAD_FONTS = [/dm-sans-latin-opsz-normal.*\.woff2$/, /geist-latin-wght-normal.*\.woff2$/];

const preloadFonts = () => ({
  name: "preload-fonts",
  transformIndexHtml: {
    order: "post",
    handler(html, ctx) {
      if (!ctx.bundle) return html; // dev server: nothing hashed to point at
      return Object.keys(ctx.bundle)
        .filter((file) => PRELOAD_FONTS.some((re) => re.test(file)))
        .map((file) => ({
          tag: "link",
          attrs: { rel: "preload", href: `/${file}`, as: "font", type: "font/woff2", crossorigin: "" },
          injectTo: "head",
        }));
    },
  },
});

// package name -> vendor chunk. Everything else is split by Vite as usual.
const VENDOR_CHUNKS = {
  react: "vendor-react",
  "react-dom": "vendor-react",
  scheduler: "vendor-react",
  "react-router": "vendor-react",
  "react-router-dom": "vendor-react",
  "framer-motion": "vendor-motion",
  motion: "vendor-motion",
  "motion-dom": "vendor-motion",
  "motion-utils": "vendor-motion",
  "react-icons": "vendor-icons",
  sonner: "vendor-toast",
  "react-hook-form": "vendor-forms",
};

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), preloadFonts()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // or "./" if no src
    },
  },
  // The challenge test runner worker loads sucrase on demand (TypeScript mode).
  // A dynamic import inside a worker needs ES output; the default (iife) cannot split code.
  worker: { format: "es" },
  build: {
    cssMinify: true,
    rollupOptions: {
      // Vendor splitting is client-only; the SSR prerender build keeps deps external.
      output: isSsrBuild ? {} : {
        // Function form, matched on the module's node_modules path: the object
        // form also pulls a package's shared deps into its chunk, which put
        // react/jsx-runtime in vendor-motion and made every page preload it.
        manualChunks(id) {
          const pkg = id.match(/node_modules\/((?:@[^/]+\/)?[^/]+)/)?.[1];
          if (!pkg) return undefined;
          return VENDOR_CHUNKS[pkg];
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
