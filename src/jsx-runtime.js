import { parseArrayChildren, parseAttributes, voidTagMap } from './utils';

export function jsx(name, attributes) {
  if (typeof name === 'string') {
    if (voidTagMap[name] === null)
      return '<' + name + parseAttributes(attributes) + '>';

    const { children } = attributes;
    return children === undefined || children === null
      ? '<' + name + parseAttributes(attributes) + '></' + name + '>'
      : '<' + name + parseAttributes(attributes) + '>' + (Array.isArray(children) ? parseArrayChildren(children) : children) + '</' + name + '>';
  }

  return name(attributes);
}

export function jsxs(name, attributes) {
  return typeof name === 'string'
    ? (name in voidTagMap
      ? '<' + name + parseAttributes(attributes) + '>'
      : '<' + name + parseAttributes(attributes) + '>' + parseArrayChildren(attributes.children) + '</' + name + '>'
    ) : name(attributes);
};

export function Fragment({ children }) {
  return Array.isArray(children) ? parseArrayChildren(children) : (children ?? '');
}

