/// <reference types='bun-types' />
import pkg from './package.json';

// Build source files
Bun.build({
    format: 'esm',
    outdir: '.',
    entrypoints: ['./src/jsx-runtime.js'],
    external: Object.keys(pkg.dependencies ?? {})
});
