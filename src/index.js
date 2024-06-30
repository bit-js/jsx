import { parseAttributes, parseChildren, voidTagMap } from './utils';

export function h(name, attributes, ...children) {
  return typeof name === 'string' ?
    (name in voidTagMap
      ? `<${name}${parseAttributes(attributes)}>`
      : `<${name}${parseAttributes(attributes)}>${parseChildren(children)}</${name}>`
    ) : name(attributes === null ? { children } : { ...attributes, children });
}

export const createElement = h;
export const Fragment = (attributes) => parseChildren(attributes.children);
