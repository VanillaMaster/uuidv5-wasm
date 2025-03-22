/**@type { PromiseWithResolvers<void> }*/
const { promise, reject, resolve } = Promise.withResolvers();

/**
 * @param { BufferSource | null } [bytes] 
 * @returns { Promise<void> }
 */
export default function(bytes = null) {
    if (bytes !== null) instantiate(bytes).then(resolve, reject);
    return promise;
}

/**
 * @param { BufferSource } bytes 
 */
async function instantiate(bytes) {
    wasm = await WebAssembly.instantiate(bytes);
    buffer = new Uint8Array(/**@type { WebAssembly.Memory } */(wasm.instance.exports.memory).buffer, /**@type { WebAssembly.Global } */(wasm.instance.exports.buffer).value, 1024);
    state = new Uint32Array(/**@type { WebAssembly.Memory } */(wasm.instance.exports.memory).buffer, /**@type { WebAssembly.Global } */(wasm.instance.exports.state).value, 5);
    ({ init, hash, finalize } = wasm.instance.exports);
}

/**@type { WebAssembly.WebAssemblyInstantiatedSource | null } */
export let wasm = null;
/**@type { Uint8Array | null } */
export let buffer = null;
/**@type { Uint32Array | null } */
export let state = null;
/**@type { WebAssembly.ExportValue | null } */
export let init = null;
/**@type { WebAssembly.ExportValue | null } */
export let hash = null;
/**@type { WebAssembly.ExportValue | null } */
export let finalize = null;