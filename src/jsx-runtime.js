import { parseArrayChildren, voidTagMap } from './utils';
import parseAttributes from './attributes';

export function jsx(name, attributes) {
  if (typeof name === 'string') {
    const { children } = attributes;

    return typeof children === 'undefined' || children === null
      ? (voidTagMap[name] === null
        ? `<${name}${parseAttributes(attributes)}>`
        : `<${name}${parseAttributes(attributes)}></${name}>`
      ) : `<${name}${parseAttributes(attributes)}>${Array.isArray(children) ? parseArrayChildren(children) : children}</${name}>`;
  }

  return name(attributes);
}

export function jsxs(name, attributes) {
  return typeof name === 'string'
    ? `<${name}${parseAttributes(attributes)}>${parseArrayChildren(attributes.children)}</${name}>`
    : name(attributes);
}

export function Fragment({ children }) {
  return Array.isArray(children) ? parseArrayChildren(children) : (children ?? '');
}

export { parseAttributes };

