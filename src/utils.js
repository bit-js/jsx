// @ts-check

/**
 * @param {any[]} children
 */
export function parseArrayChildren(children) {
  return (children.includes(null) || children.includes(undefined) ? children.map((val) => val ?? '') : children).join('');
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

