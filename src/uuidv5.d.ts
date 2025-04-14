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
 * `6ba7b810-9dad-11d1-80b4-00c04fd430c8`
 * 
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_DNS: Uint8Array;
/**
 * Name string is a URL
 * 
 * `6ba7b811-9dad-11d1-80b4-00c04fd430c8`
 * 
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_URL: Uint8Array;
/**
 * Name string is an ISO OID
 * 
 * `6ba7b812-9dad-11d1-80b4-00c04fd430c8`
 * 
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_OID: Uint8Array;
/**
 * Name string is an X.500 DN (in DER or a text output format)
 * 
 * `6ba7b814-9dad-11d1-80b4-00c04fd430c8`
 * 
 * [UUID RFC](https://www.rfc-editor.org/rfc/rfc4122)
 */
export const NameSpace_X500: Uint8Array;