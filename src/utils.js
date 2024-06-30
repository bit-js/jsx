export function kebabReplacer(char) {
  return `${char[0]}-${char[1].toLowerCase()}`;
}

export function parseStyles(styles) {
  if (typeof styles === 'string') return styles.replace(/'/g, '"');

  const keys = Object.keys(styles);
  let result = '';

  for (let i = 0, { length } = keys; i < length; ++i) {
    const key = keys[i];
    const value = styles[key];

    if (value !== null && value !== undefined) {
      result += key.replace(/[a-z][A-Z]/g, kebabReplacer) + ':';

      if (typeof value === 'string') {
        let idx = value.indexOf("'");
        if (idx === -1) result += value;

        else {
          let st = 0;

          do {
            result += value.substring(st, idx) + '"';
            st = idx + 1;
            idx = value.substring("'", st);
          } while (idx !== -1);
        }
      } else result += value;

      result += ';';
    }
  }

  return result;
}

export function parseAttributes(attributes) {
  const keys = Object.keys(attributes);
  let result = '';

  for (let i = 0, { length } = keys; i < length; ++i) {
    const key = keys[i];
    const value = attributes[key];

    if (key !== 'children') {
      if (key === 'class') {
        if (typeof value === 'string') result += ` class='${value.replace(/'/g, '"')}'`;
        else if (value.length !== 0) result += ` class='${value.join(' ').replace(/'/g, '"')}'`;
      }

      else if (key === 'style')
        result += ` style='${parseStyles(value)}'`;

      else if (typeof value === 'boolean') {
        if (value) result += ' ' + key;
      }

      else
        result += ` ${key}='${typeof value === 'string'
            ? value.replace(/'/g, '"')
            : typeof value === 'object'
              ? value instanceof Date
                ? value.toISOString()
                : (value + '').replace(/'/g, '"')
              : value
          }'`;
    }
  }
}

export function parseChildren(children) {
  return children === undefined || children === null ? '' : Array.isArray(children) ? children.join('') : children;
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
