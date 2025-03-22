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
 * Name string is an X.500 DN (in DER or a text output format)
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
 * Name string is an ISO OID
 * 
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_X500 = new Uint8Array([
    0x6b, 0xa7, 0xb8, 0x14,
    0x9d, 0xad,
    0x11, 0xd1,
    0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8
])

const encoder = new TextEncoder();

/**
 * @param { string } value 
 * @param { Uint8Array } namespace 
 */
export function v5(value, namespace) {
    init();
    while (namespace.length > 0) {
        const length = Math.min(namespace.length, 1024);
        buffer.set(namespace.subarray(0, length));
        namespace = namespace.subarray(length);
        hash(length);
    }
    while (value.length > 0) {
        const { read, written } = encoder.encodeInto(value, buffer);
        value = value.substring(read);
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
    init();
    while (namespace.length > 0) {
        const length = Math.min(namespace.length, 1024);
        buffer.set(namespace.subarray(0, length));
        namespace = namespace.subarray(length);
        hash(length);
    }
    while (value.length > 0) {
        const { read, written } = encoder.encodeInto(value, buffer);
        value = value.substring(read);
        hash(written);
    }
    finalize();
    return bufferize(state);
}