Bun.build({
  format: 'esm',
  target: 'bun',
  outdir: '.',
  entrypoints: ['./real-world.jsx'],
  minify: { whitespace: true, identifiers: true }
});

