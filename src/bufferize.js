/**
 * @param { Uint8Array } bytes 
 * @returns { Uint8Array }
 */
export function bufferize(bytes) {
    return Uint8Array.of(
        bytes[0x3],
        bytes[0x2],
        bytes[0x1],
        bytes[0x0],
        bytes[0x7],
        bytes[0x6],
        bytes[0x5] & 0x0F | 0x50,
        bytes[0x4],
        bytes[0xB] & 0x3F | 0x80,
        bytes[0xA],
        bytes[0x9],
        bytes[0x8],
        bytes[0xF],
        bytes[0xE],
        bytes[0xD],
        bytes[0xC]
    );
}