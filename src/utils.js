function escapeSingleQuote(value) {
  return value.indexOf("'") === -1 ? value : value.replace(/'/g, '"');
}

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

    // Most common key
    if (key === 'class') {
      result += ` class='${escapeSingleQuote(value)}'`;
    } else if (key === 'style') {
      if (typeof value === 'string')
        result += ` style='${escapeSingleQuote(value)}'`;
      else {
        let str = '';

        for (const k in value) {
          const v = value[key];

          if (v !== null && v !== undefined)
            str += `${k.replace(/[a-z][A-Z]/g, (chars) => `${chars[0]}-${chars[1].toLowerCase()}`)}:${v};`
        }

        result += ` style='${escapeSingleQuote(str)}'`;
      }
    } else if (key !== 'children') {
      if (typeof value === 'string')
        result += ` ${key}='${escapeSingleQuote(value)}'`;
      else if (typeof value === 'boolean') {
        if (value) {
          result += ' ';
          result += key;
        }
      } else if (typeof value === 'object')
        result += ` ${key}='${value instanceof Date ? value.toISOString() : escapeSingleQuote(value.toString())}'`;
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
