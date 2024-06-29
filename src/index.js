import { parseAttributes, parseChildren } from './utils';

export function h(name, attributes, ...children) {
  return typeof name === 'function'
    ? name(attributes === null ? { children } : { ...attributes, children })
    : name in voidTagMap
      ? `<${name}${parseAttributes(attributes)}>`
      : `<${name}${parseAttributes(attributes)}>${parseChildren(children)}</${name}>`;
}

export const createElement = h;
export const Fragment = (attributes) => parseChildren(attributes.children);
export { escapeHTML } from '@bit-js/web-utils';
