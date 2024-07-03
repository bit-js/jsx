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
    const value = attributes[key];

    if (key === 'class') {
      result += " class='" + (typeof value === 'string' && value.indexOf("'") !== -1
        ? value.replace(/'/g, '"')
        : value) + "'";
    } else if (key !== 'children') {
      if (typeof value === 'string')
        result += ` ${key}='${value.indexOf("'") === -1 ? value : value.replace(/'/g, '"')}'`;
      else if (typeof value === 'boolean') {
        if (value) {
          result += ' ';
          result += key;
        }
      } else if (typeof value === 'object') {
        if (value instanceof Date)
          result += ` ${key}='${value.toISOString()}'`;
        else {
          const str = value + '';
          result += ` ${key}='${str.indexOf("'") === -1 ? str : str.replace(/'/g, '"')}'`
        }
      }
      else
        result += ` ${key}=${value}`;
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

