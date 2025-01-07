import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import astroI18next from "astro-i18next";
import react from '@astrojs/react';
import node from '@astrojs/node'; // Ajoutez cette ligne

export default defineConfig({
  integrations: [
    react({
      include: ['**/react/*', '**/components/*'],
      jsxImportSource: 'react',
      experimentalReactChildren: true
    }),
    tailwind(),
    astroI18next({
      i18next: {
        supportedLngs: ["he", "fr"],
        defaultLocale: "he",
        fallbackLng: "he"
      }
    })
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    plugins: [],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'lucide-react', 'recharts']
    },
  },
  site: 'https://www.atrehitim.co.il',
  image: {
    remotePatterns: [{ protocol: "https" }],
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }

});