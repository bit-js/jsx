import fs from 'fs';

const rootPath = `${import.meta.dir}/src`;
const dirs = fs.readdirSync(rootPath);
const env = { NODE_ENV: 'production' };

function setupBench(category, targetFile) {
  category = category.replace(/ /g, '_');

  const results = dirs.map((dir, idx) => `import ${category}${idx} from '${rootPath}/${dir}/${targetFile}';`);

  results.push(`group('${category}', () => {\n  const t = ('H' + Math.random()).repeat(100);`);

  for (let i = 0, { length } = dirs; i < length; ++i) {
    const dir = dirs[i];

    const buildFile = `${rootPath}/${dir}/build.ts`;
    if (fs.existsSync(buildFile)) {
      console.log(buildFile);
      Bun.spawnSync(['bun', buildFile], { cwd: `${rootPath}/${dir}`, env });
    }

    results.push(`  bench('${dir}', () => ${category}${i}(t));`);
  }

  results.push('});');

  return results.join('\n') + '\n';
}

Bun.write(`${import.meta.dir}/index.js`,
  'import { group, run, bench } from "mitata";\n'
  + `for (let i = 0; i < 10; ++i) bench('noop', () => {});`
  + setupBench('Real world', 'real-world.js')
  + 'run();'
);
