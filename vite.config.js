import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        ssr: 'src/generate-icons.js',
        outDir: 'dist',
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                format: 'cjs',
                entryFileNames: '[name].cjs'
            }
        }
    }
});

