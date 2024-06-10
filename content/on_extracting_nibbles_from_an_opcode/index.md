+++
title = "On extracting opcode and nibbles"
date = 2024-06-05
draft = true

[taxonomies]
tags = ["rust"]
categories = ["emulation", "programming"]
+++

Disons que je viens de lire une ROM de Chip8, je me retrouve avec la donnee suivante:

```rs
let data: Vec<u16> = vec![0x12, 0x02];
```

# Extraire l'opcode

Pour mieux comprendre ce que je vais faire, je dois voir la donnee en binaire:

|        | `data[0]`               | `data[1]`               |
|:------:|:-----------------------:|:-----------------------:|
| hex    | `0x12`                  | `0x02`                  |
| binary | `0b0000_0000_0001_0010` | `0b0000_0000_0000_0010` |

Le but de l'extraction d'opcode est en fait de fusionner deux instruction 8bits en une de 16bits (du moins pour les instructions de Chip8).
Voici comment faire:

```rs
let i: usize = 0;
let opcode: u16 = (data[i] << 8) | data[i + 1];
```

Voici plus bas uncode detaillee et commente de chaque etape pour visualiser ce qu'il se passe, mais esentiellement, je decale `data[i]` de 8 bits vers la gauche avec l'operateur `<<` et ensuite je fusionne la valeur obtenue avec `data[i + 1]` en utilisant l'operateur `|`.

```rs
let i: usize = 0;

// l'operateur << bouge chaque bits de 8 position sur la gauche
// data[i] equals 0b0000_0000_0001_0010
let shift: u16 = data[i] << 8; // shift equals 0b0001_0010_0000_0000
// before shift: 0b0000_0000_0001_0010
//               ---------------------
// after shift : 0b0001_0010_0000_0000

// l'operateur | retourne 1 si au moins une des valeurs de l'expression est 1
// data[i + 1] equals 0b0000_0000_0000_0010
let opcode: u16 = shift | data[i + 1]; // opcode equals 0b0001_0010_0000_0010
// shift      : 0b0001_0010_0000_0000
//              ---------------------
// data[i + 1]: 0b0000_0000_0000_0010
//              ---------------------
// opcode     : 0b0001_0010_0000_0010
```

# Extraire les nibbles