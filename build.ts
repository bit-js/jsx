/// <reference types='bun-types' />
import pkg from './package.json';

// Build source files
Bun.build({
    format: 'esm',
    target: 'bun',
    outdir: '.',
    entrypoints: ['./src/index.js', './src/jsx-runtime.js', './src/jsx-dev-runtime.js'],
    minify: {
        whitespace: true
    },
    external: Object.keys(pkg.dependencies ?? {})
});
