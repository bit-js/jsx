export default (attributes) => {
  let result = '';

  for (const key in attributes) {
    if (key === 'class') {
      const value = attributes[key];

      result += ` class='${typeof value === 'string' && value.indexOf("'") !== -1
        ? value.replace(/'/g, '"')
        : value}'`;
    } else if (key !== 'children') {
      const value = attributes[key];

      const type = typeof value;
      if (type === 'string')
        result += ` ${key}='${value.indexOf("'") === -1 ? value : value.replace(/'/g, '"')}'`;
      else if (type === 'boolean') {
        if (value) result += ` ${key}`;
      } else if (type === 'object') {
        if (value instanceof Date)
          result += ` ${key}='${value.toISOString()}'`;
        else {
          const str = value + '';
          result += ` ${key}='${str.indexOf("'") === -1 ? str : str.replace(/'/g, '"')}'`
        }
      } else result += ` ${key}='${value}'`;
    }
  }

  return result;
}

