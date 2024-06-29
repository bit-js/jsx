import { parseAttributes, parseChildren } from './utils';

const voidTagMap = {
  meta: null,
  link: null,
  img: null,
  br: null,
  input: null,
  hr: null,
  area: null,
  base: null,
  col: null,
  command: null,
  embed: null,
  keygen: null,
  param: null,
  source: null,
  track: null,
  wbr: null
};

export function jsx(name, attributes) {
  return typeof name === 'function'
    ? name(attributes)
    : name in voidTagMap
      ? `<${name}${parseAttributes(attributes)}>`
      : `<${name}${parseAttributes(attributes)}>${parseChildren(attributes.children)}</${name}>`;
}

export const jsxs = jsx;
export { Fragment } from './index.js';
