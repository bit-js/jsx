import fs from 'fs';

const rootPath = `${import.meta.dir}/src`;
const dirs = fs.readdirSync(rootPath);

Bun.$.env({ NODE_ENV: 'production' });
Bun.$.cwd(rootPath);

async function setupBench(category, targetFile) {
  category = category.replace(/ /g, '_');

  const results = dirs.map((dir, idx) => `import ${category}${idx} from '${rootPath}/${dir}/dist/${targetFile}';`);

  results.push(`group('${category}', () => {\n  const t = [${new Array(100).fill(0).map(() => "('H' + Math.random()).repeat(100)")}];`);

  for (let i = 0, { length } = dirs; i < length; ++i) {
    const dir = dirs[i];
    await Bun.$`cd ${dir} && bun i && bun run build`;

    results.push(`  bench('${dir}', () => t.map(${category}${i}));`);
  }

  results.push('});');

  return '\n' + results.join('\n') + '\n';
}

Bun.write(`${import.meta.dir}/index.js`,
  'import { group, run, bench } from "mitata";\n'
  + `for (let i = 0; i < 10; ++i) bench('noop', () => {});`
  + await setupBench('Real world', 'real-world.js')
  + 'run();'
);
