export { default } from "./sha1.js";
/**
 * @param { string } value
 * @param { Uint8Array } namespace
 */
export function v5(value: string, namespace: Uint8Array): string;
/**
 * @param { string } value
 * @param { Uint8Array } namespace
 */
export function v5Bytes(value: string, namespace: Uint8Array): Uint8Array;
/**
 * Name string is a fully-qualified domain name
 *
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_DNS: Uint8Array<ArrayBuffer>;
/**
 * Name string is a URL
 *
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_URL: Uint8Array<ArrayBuffer>;
/**
 * Name string is an X.500 DN (in DER or a text output format)
 *
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_OID: Uint8Array<ArrayBuffer>;
/**
 * Name string is an ISO OID
 *
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_X500: Uint8Array<ArrayBuffer>;