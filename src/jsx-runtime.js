import { parseAttributes, parseChildren, voidTagMap } from './utils';

export function jsx(name, attributes) {
  return typeof name === 'string'
    ? (name in voidTagMap
      ? `<${name}${parseAttributes(attributes)}>`
      : `<${name}${parseAttributes(attributes)}>${parseChildren(attributes.children)}</${name}>`
    ) : name(attributes);
}

export const jsxs = jsx;
export { Fragment } from './index.js';
