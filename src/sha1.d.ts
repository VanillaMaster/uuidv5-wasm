export default function(bytes?: BufferSource): Promise<void>;
export const wasm: WebAssembly.WebAssemblyInstantiatedSource;
export const buffer: Uint8Array;
export const state: Uint32Array;
export function init(): void;
export function hash(length: number): void;
export function finalize(): void;