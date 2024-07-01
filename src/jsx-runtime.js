import { parseArrayChildren, parseAttributes, voidTagMap } from './utils';

export function jsx(name, attributes) {
  if (typeof name === 'string') {
    if (name in voidTagMap)
      return `<${name}${parseAttributes(attributes)}>`;

    const { children } = attributes;
    return children === undefined || children === null
      ? `<${name}${parseAttributes(attributes)}></${name}>`
      : `<${name}${parseAttributes(attributes)}>${Array.isArray(children) ? parseArrayChildren(children) : children}</${name}>`;
  }

  return name(attributes);
}

export function jsxs(name, attributes) {
  if (typeof name === 'string') {
    if (name in voidTagMap)
      return `<${name}${parseAttributes(attributes)}>`;

    return `<${name}${parseAttributes(attributes)}>${parseArrayChildren(attributes.children)}</${name}>`;
  }

  return name(attributes);
};

export function Fragment({ children }) {
  return Array.isArray(children) ? parseArrayChildren(children) : (children ?? '');
}

