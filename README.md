# A JSX renderer

Use this if you can't use template strings somehow and still want the performance to be 'decent'.

## Setup

All the crap you need to do to set this up:

### Config

Add these stuff to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@bit-js/jsx"
  }
}
```

### Usage

Then you can write JSX in your file:

```tsx
const html: string = <p>Hi</p>;
```

And to escape some strings:

```tsx
import { escapeHTML } from "@bit-js/jsx";

const html: string = <div>{escapeHTML(htmlString)}</div>;
```
