// @ts-check

/**
 * @param {any[]} children
 */
export function parseArrayChildren(children) {
  return (children.includes(null) || children.includes(undefined) ? children.map((val) => val ?? '') : children).join('');
}

/**
 * @param {Record<string, any>} attributes
 */
export function parseAttributes(attributes) {
  let result = '';

  for (const key in attributes) {
    if (key === 'children') continue;

    const value = attributes[key];

    if (key === 'class') {
      result += ` class='${typeof value === 'string' && value.indexOf("'") !== -1
        ? value.replace(/'/g, '"')
        : value}'`;
    } else switch (typeof value) {
      case 'string':
        result += ` ${key}='${value.indexOf("'") === -1 ? value : value.replace(/'/g, '"')}'`;
        continue;

      case 'boolean':
        if (value) result += ' ' + key;
        continue;

      case 'object':
        if (value instanceof Date)
          result += ` ${key}='${value.toISOString()}'`;
        else {
          const str = value + '';
          result += ` ${key}='${str.indexOf("'") === -1 ? str : str.replace(/'/g, '"')}'`
        }
        continue;

      default:
        result += ` ${key}='${value}'`;
        continue;
    }
  }

  return result;
}

export const voidTagMap = {
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

