import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { grasprBuild } from '@phillipsharring/graspr-build/vite';
import siteConfig from './site.config.js';

export default defineConfig({
    root: 'src',
    publicDir: '../public',
    optimizeDeps: {
        entries: ['app.js'],
        include: ['htmx.org', 'handlebars', 'sortablejs'],
    },
    server: {
        proxy: {
            '/api': {
                target: process.env.HANDLR_ORIGIN || 'http://localhost:8000',
                changeOrigin: false,
                secure: false,
            },
        },
    },
    plugins: [tailwindcss(), grasprBuild({ siteConfig })],
    build: {
        outDir: '../dist',
        assetsDir: 'assets',
        manifest: true,
        emptyOutDir: true,
        rollupOptions: {
            input: { app: './src/app.js' },
            onwarn(warning, warn) {
                if (warning?.code === 'EVAL' && typeof warning?.id === 'string' && warning.id.includes('/node_modules/htmx.org/')) return;
                warn(warning);
            },
        },
    },
});
