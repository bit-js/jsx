import { group, run, bench } from "mitata";
for (let i = 0; i < 10; ++i) bench('noop', () => {});import Real_world0 from '/home/reve/Desktop/dev/TypeScript/Projects/Packages/jsx/bench/src/bit-jsx/real-world.js';
import Real_world1 from '/home/reve/Desktop/dev/TypeScript/Projects/Packages/jsx/bench/src/kita-html/real-world.js';
group('Real_world', () => {
  const t = ('H' + Math.random()).repeat(100);
  bench('bit-jsx', () => Real_world0(t));
  bench('kita-html', () => Real_world1(t));
});
run();