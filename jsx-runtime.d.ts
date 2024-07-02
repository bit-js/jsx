/// <reference path='./jsx.d.ts' />

export type Children =
  | number
  | string
  | boolean
  | null
  | undefined
  | bigint
  | Children[];

export type PropsWithChildren<T = {}> = { children?: Children } & T;

/**
 * Generates a html string from the given contents.
 *
 * @param name The name of the element to create or a function that creates the element.
 * @param attributes A record of literal values to use as attributes. A property named `children` will be used as the children of the element.
 * @param children The inner contents of the element.
 * @returns The generated html string.
 */
export function jsx(name: string | ((...args: any[]) => any), attributes: PropsWithChildren<any>): JSX.Element;
export const jsxs: typeof jsx;


/**
 * A JSX Fragment is used to return multiple elements from a component.
 *
 * @example
 *
 * ```tsx
 * // renders <div>1</div> and <div>2</div> without needing a wrapper element
 * const html = <><div>1</div><div>2</div></>
 * ```
 */
export function Fragment(props: PropsWithChildren): JSX.Element;
