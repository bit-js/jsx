const propHandler = {
  class: (value) => typeof value === 'string'
    ? ` class='${value.replace(/'/g, '"')}'`
    : value.length === 0
      ? ''
      : ` class='${value.join(' ').replace(/'/g, '"')}'`,

  style: (value) => ` style='${(typeof value === 'string'
    ? value
    : Object.entries(value).map(([key, value]) => value === undefined || value === null
      ? ''
      : `${key.replace(/[A-Z]/g, (char) => '-' + char.toLowerCase())}:${value};`).join('')
  ).replace(/'/g, '"')}'`,

  children: () => ''
};

export function parseAttributes(attributes) {
  return Object.entries(attributes).map(([key, value]) =>
    propHandler[key]?.(value) ?? (
      typeof value === 'boolean' ? (value ? ' ' + key : '') :
        typeof value === 'string' ? ` ${key}='${value.replace(/'/g, '"')}'` :
          typeof value === 'object' ? ` ${key}='${value instanceof Date ? value.toISOString() : (value + '').replace(/'/g, '"')}'` : ` ${key}='${value}'`
    )
  ).join('');
}

export function parseChildren(children) {
  return children === undefined || children === null ? '' : Array.isArray(children) ? children.join('') : children;
}
