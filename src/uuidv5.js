import { bufferize } from "./bufferize.js";
import { init, hash, finalize, buffer, state } from "./sha1.js";
import { stringify } from "./stringify.js"
export { default } from "./sha1.js";

/**
 * Name string is a fully-qualified domain name
 * 
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_DNS = new Uint8Array([
    0x6b, 0xa7, 0xb8, 0x10,
    0x9d, 0xad,
    0x11, 0xd1,
    0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8
]);

/**
 * Name string is a URL
 * 
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_URL = new Uint8Array([
    0x6b, 0xa7, 0xb8, 0x11,
    0x9d, 0xad,
    0x11, 0xd1,
    0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8
])

/**
 * Name string is an ISO OID
 * 
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_OID = new Uint8Array([
    0x6b, 0xa7, 0xb8, 0x12,
    0x9d, 0xad,
    0x11, 0xd1,
    0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8
])

/**
 * Name string is an X.500 DN (in DER or a text output format)
 * 
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_X500 = new Uint8Array([
    0x6b, 0xa7, 0xb8, 0x14,
    0x9d, 0xad,
    0x11, 0xd1,
    0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8
])

/**
 * @param { boolean } ok 
 * @param { string } message 
 * @param { new (message: string) => Error } [Error] 
 * @returns { asserts ok }
 * 
 * @__NO_SIDE_EFFECTS__
 */
export function assert(ok, message, Error = globalThis.Error) {
    if (!ok) throw new Error(message);
}

const encoder = new TextEncoder();

/**
 * @param { string } value 
 * @param { Uint8Array } namespace 
 */
export function v5(value, namespace) {
    assert(namespace.length === 16, "Unexpected size of namespace");
    init();
    buffer.set(namespace);
    hash(16);
    let { read, written } = encoder.encodeInto(value, buffer);
    hash(written);
    while (read < value.length) {
        value = value.substring(read);
        ({ read, written } = encoder.encodeInto(value, buffer));
        hash(written);
    }
    finalize();
    return stringify(state);
}

/**
 * @param { string } value 
 * @param { Uint8Array } namespace 
 */
export function v5Bytes(value, namespace) {
    assert(namespace.length === 16, "Unexpected size of namespace");
    init();
    buffer.set(namespace);
    hash(16);
    let { read, written } = encoder.encodeInto(value, buffer);
    hash(written);
    while (read < value.length) {
        value = value.substring(read);
        ({ read, written } = encoder.encodeInto(value, buffer));
        hash(written);
    }
    finalize();
    return bufferize(state);
}