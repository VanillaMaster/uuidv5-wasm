#include <stdint.h>
#include <stddef.h>

#define rol(value, bits) (((value) << (bits)) | ((value) >> (32 - (bits))))
#define blk0(i) (block.i32[i] = (rol(block.i32[i],24)&0xFF00FF00)|(rol(block.i32[i],8)&0x00FF00FF))
#define blk(i) (block.i32[i&15] = rol(block.i32[(i+13)&15]^block.i32[(i+8)&15]^block.i32[(i+2)&15]^block.i32[i&15],1))

#define R0(v,w,x,y,z,i) z+=((w&(x^y))^y)+blk0(i)+0x5A827999+rol(v,5);w=rol(w,30);
#define R1(v,w,x,y,z,i) z+=((w&(x^y))^y)+blk(i)+0x5A827999+rol(v,5);w=rol(w,30);
#define R2(v,w,x,y,z,i) z+=(w^x^y)+blk(i)+0x6ED9EBA1+rol(v,5);w=rol(w,30);
#define R3(v,w,x,y,z,i) z+=(((w|x)&y)|(w&x))+blk(i)+0x8F1BBCDC+rol(v,5);w=rol(w,30);
#define R4(v,w,x,y,z,i) z+=(w^x^y)+blk(i)+0xCA62C1D6+rol(v,5);w=rol(w,30);

#define BUFFER_SIZE 1024

typedef union {
    uint8_t i8[64];
    uint32_t i32[16];
} BLOCK;

uint8_t buffer[BUFFER_SIZE];
size_t buffer_offset;

BLOCK block;
size_t block_offset;

uint32_t state[5];
uint64_t count;


void hash_block() {
	uint32_t a = state[0], b = state[1], c = state[2], d = state[3], e = state[4];

	/* 4 rounds of 20 operations each. Loop unrolled. */
	R0(a, b, c, d, e,  0); R0(e, a, b, c, d,  1); R0(d, e, a, b, c,  2); R0(c, d, e, a, b,  3);
	R0(b, c, d, e, a,  4); R0(a, b, c, d, e,  5); R0(e, a, b, c, d,  6); R0(d, e, a, b, c,  7);
	R0(c, d, e, a, b,  8); R0(b, c, d, e, a,  9); R0(a, b, c, d, e, 10); R0(e, a, b, c, d, 11);
	R0(d, e, a, b, c, 12); R0(c, d, e, a, b, 13); R0(b, c, d, e, a, 14); R0(a, b, c, d, e, 15);
	R1(e, a, b, c, d, 16); R1(d, e, a, b, c, 17); R1(c, d, e, a, b, 18); R1(b, c, d, e, a, 19);
	R2(a, b, c, d, e, 20); R2(e, a, b, c, d, 21); R2(d, e, a, b, c, 22); R2(c, d, e, a, b, 23);
	R2(b, c, d, e, a, 24); R2(a, b, c, d, e, 25); R2(e, a, b, c, d, 26); R2(d, e, a, b, c, 27);
	R2(c, d, e, a, b, 28); R2(b, c, d, e, a, 29); R2(a, b, c, d, e, 30); R2(e, a, b, c, d, 31);
	R2(d, e, a, b, c, 32); R2(c, d, e, a, b, 33); R2(b, c, d, e, a, 34); R2(a, b, c, d, e, 35);
	R2(e, a, b, c, d, 36); R2(d, e, a, b, c, 37); R2(c, d, e, a, b, 38); R2(b, c, d, e, a, 39);
	R3(a, b, c, d, e, 40); R3(e, a, b, c, d, 41); R3(d, e, a, b, c, 42); R3(c, d, e, a, b, 43);
	R3(b, c, d, e, a, 44); R3(a, b, c, d, e, 45); R3(e, a, b, c, d, 46); R3(d, e, a, b, c, 47);
	R3(c, d, e, a, b, 48); R3(b, c, d, e, a, 49); R3(a, b, c, d, e, 50); R3(e, a, b, c, d, 51);
	R3(d, e, a, b, c, 52); R3(c, d, e, a, b, 53); R3(b, c, d, e, a, 54); R3(a, b, c, d, e, 55);
	R3(e, a, b, c, d, 56); R3(d, e, a, b, c, 57); R3(c, d, e, a, b, 58); R3(b, c, d, e, a, 59);
	R4(a, b, c, d, e, 60); R4(e, a, b, c, d, 61); R4(d, e, a, b, c, 62); R4(c, d, e, a, b, 63);
	R4(b, c, d, e, a, 64); R4(a, b, c, d, e, 65); R4(e, a, b, c, d, 66); R4(d, e, a, b, c, 67);
	R4(c, d, e, a, b, 68); R4(b, c, d, e, a, 69); R4(a, b, c, d, e, 70); R4(e, a, b, c, d, 71);
	R4(d, e, a, b, c, 72); R4(c, d, e, a, b, 73); R4(b, c, d, e, a, 74); R4(a, b, c, d, e, 75);
	R4(e, a, b, c, d, 76); R4(d, e, a, b, c, 77); R4(c, d, e, a, b, 78); R4(b, c, d, e, a, 79);

	state[0] += a;
	state[1] += b;
	state[2] += c;
	state[3] += d;
	state[4] += e;

	block_offset = 0;
}

void init() {
	state[0] = 0x67452301;
	state[1] = 0xEFCDAB89;
	state[2] = 0x98BADCFE;
	state[3] = 0x10325476;
	state[4] = 0xC3D2E1F0;
	count = 0;
	block_offset = 0;
	buffer_offset = 0;
}

void hash(int32_t length) {
	while (buffer_offset < length) {
		block.i8[block_offset++] = buffer[buffer_offset++];
		if (block_offset == 64) hash_block();
	}
	count += length * 8;
	buffer_offset = 0;
}

void finalize() {
	block.i8[block_offset++] = 0x80;
	if (block_offset == 64) hash_block();

	if (block_offset > 56) {
		while (block_offset < 64) block.i8[block_offset++] = 0;
		hash_block();
	}

	while (block_offset < 56) block.i8[block_offset++] = 0;

	block.i8[56] = count >> 0x38 & 0xFF;
	block.i8[57] = count >> 0x30 & 0xFF;
	block.i8[58] = count >> 0x28 & 0xFF;
	block.i8[59] = count >> 0x20 & 0xFF;
	block.i8[60] = count >> 0x18 & 0xFF;
	block.i8[61] = count >> 0x10 & 0xFF;
	block.i8[62] = count >> 0x08 & 0xFF;
	block.i8[63] = count >> 0x00 & 0xFF;

	hash_block();
}