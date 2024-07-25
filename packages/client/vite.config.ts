import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { netlifyPlugin } from '@netlify/remix-adapter/plugin';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ['**/*.module.scss'],
    }),
    netlifyPlugin(),
    tsconfigPaths(),
    svgr(),
  ],
});
