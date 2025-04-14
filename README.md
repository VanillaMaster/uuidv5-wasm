# @vanilla/uuidv5-wasm
sync uuid v5 implementation

## requirements
- [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)

## installation
```
npm install https://github.com/VanillaMaster/uuidv5-wasm/releases/download/0.0.1-rc.2/vanilla-uuidv5-wasm-0.0.1.tgz
```

## example
### Node.js
```js
import init, { v5, NameSpace_URL } from "@vanilla/uuidv5-wasm";
import { readFile } from "node:fs/promises";

const wasm = await readFile(new URL(import.meta.resolve("@vanilla/uuidv5-wasm/mod.wasm")));
await init(wasm);

const uuid = v5("https://example.com", NameSpace_URL);
```
### Vite
```js
import init, { v5, NameSpace_URL } from "@vanilla/uuidv5-wasm";
import url from "@vanilla/uuidv5-wasm/mod.wasm?url";

const wasm = await fetch(url).then(resp => resp.arrayBuffer());
await init(wasm);

const uuid = v5("https://example.com", NameSpace_URL);
```