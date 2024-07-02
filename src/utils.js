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

    // Ain't no way engines cannot optimize this shit
    switch (normalPropMap[key]) {
      case 0:
        continue;

      case 1:
        result += ` ${key}='${typeof value === 'string'
          ? (value.indexOf("'") === -1 ? value : value.replace(/'/g, '"'))
          : value}'`;

        continue;

      case 2:
        if (typeof value === 'string')
          result += ` style='${value.indexOf("'") === -1 ? value : value.replace(/'/g, '"')}'`;
        else {
          let str = '';

          for (const k in value) {
            const v = value[key];

            if (v !== null && v !== undefined)
              str += `${k.replace(/[a-z][A-Z]/g, (chars) => `${chars[0]}-${chars[1].toLowerCase()}`)}:${v};`
          }

          result += ` style='${str.indexOf("'") === -1 ? str : str.replace(/'/g, '"')}'`;
        }

        continue;

      case 3:
        if (value === true) {
          result += ' ';
          result += key;
        }

        continue;

      default:
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

// Map props to types to match them fast
export const normalPropMap = {
  // Ignore
  children: 0,

  // Stringify non-object content
  class: 1,
  content: 1,
  name: 1,
  type: 1,
  value: 1,
  placeholder: 1,
  href: 1,
  src: 1,
  id: 1,
  for: 1,
  rows: 1,
  cols: 1,
  title: 1,
  width: 1,
  start: 1,
  media: 1,
  preload: 1,
  height: 1,
  alt: 1,
  charset: 1,
  action: 1,
  method: 1,

  // Style (yes, just fucking style btw)
  style: 2,

  // Boolean 
  open: 3,
  selected: 3,
  loop: 3,
  muted: 3,
  controls: 3,
  autoplay: 3,
  autofocus: 3,
  disabled: 3
};
