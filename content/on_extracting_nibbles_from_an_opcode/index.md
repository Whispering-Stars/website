+++
title = "On extracting opcode and nibbles"
description = "How to extract nibbles from a Chip8 instruction."
date = 2024-06-05

[taxonomies]
tags = ["rust"]
categories = ["emulation", "programming"]
+++

Let's say you've successfully read a Chip8 ROM and ended up with the following data:

```rs
let data: Vec<u16> = vec![0x12, 0x02];
```

# Extracting the opcode

To better understand what we're going to do, we need to see the binary data:

|        | `data[0]`               | `data[1]`               |
|:------:|:-----------------------:|:-----------------------:|
| hex    | `0x12`                  | `0x02`                  |
| binary | `0b0000_0000_0001_0010` | `0b0000_0000_0000_0010` |

As I understand it, the aim of opcode extraction is to merge two 8-bit instructions into one 16-bit instruction (at least for Chip8 instructions).
Here's how:

```rs
let i: usize = 0;
let opcode: u16 = (data[i] << 8) | data[i + 1];
```

Here's a detailed and commented code of each step above to visualize what's going on, but essentially, we shift `data[i]` 8 bits to the left with the `<<` operator and then merge the resulting value with `data[i + 1]` using the `|` operator.

```rs
let i: usize = 0;

// the << operator moves each bit 8 positions to the left
// data[i] equals 0b0000_0000_0001_0010
let shift: u16 = data[i] << 8; // shift equals 0b0001_0010_0000_0000
// before shift: 0b0000_0000_0001_0010
//               ---------------------
// after shift : 0b0001_0010_0000_0000

// the | operator returns 1 if at least one of the values in the expression is 1
// data[i + 1] equals 0b0000_0000_0000_0010
let opcode: u16 = shift | data[i + 1]; // opcode equals 0b0001_0010_0000_0010
// shift      : 0b0001_0010_0000_0000
//              ---------------------
// data[i + 1]: 0b0000_0000_0000_0010
//              ---------------------
// opcode     : 0b0001_0010_0000_0010
```

# Extracting nibbles

Extracting the nibbles means separating the opcode into 4 half-byte (4 bits).

```rs
let nibbles: (u16, u16, u16, u16) = (
    (opcode & 0xF000) >> 12,
    (opcode & 0x0F00) >> 8,
    (opcode & 0x00F0) >> 4,
    (opcode & 0x000F),
);
```

Here's a detailed and commented code of the first step (the rest can be extrapolated from this step). Essentially, first we extract the 4 bits we're interested in with the `&` operator and then shift to the right the number of bits (for this step, 12 bits) that separate us from the 4 rightmost bits.

```rs
// opcode binaire actuel: 0b0001_0010_0000_0010
let opcode: u16 = 0x1202;

// the & operator returns 1 if and only if both values of the expression are 1
let and_mask: u16 = opcode & 0xF000; // and_mask equals 0b0001_0000_0000_0000

// the >> operator moves each bit of P position to the left (here 12)
let nibble: u16 = and_mask >> 12; // nibble equals 0b0000_0000_0000_0001
//                           |  |
//                           ---- usually a multiple of 4
// opcode     : 0b0001_0010_0000_0010
//              ---------------------
// and_mask   : 0b0001_0000_0000_0000
//              ---------------------
// nibble     : 0b0000_0000_0000_0001
```

> This is an important part of writing an emulator, at least for simple emulators like the Chip8.