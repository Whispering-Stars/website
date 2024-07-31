+++
title = "On working with FVM & Melos"
description = "How to solve the problem of Melos using the global Dart SDK instead of the FVM SDK."
date = 2024-06-04
updated = 2024-06-08

[taxonomies]
tags = ["flutter", "fvm", "melos"]
categories = ["programming"]
+++

# Installing Melos

```sh
fvm dart pub global activate melos
```

Melos website indicates to use this command `dart pub global activate melos`, so to force the use of the FVM' Dart SDK, prefix it with `fvm`.

# Using Melos with FVM

```sh
fvm flutter pub run melos bs
```

Once again, prefix the command indicated by Melos (`melos bs`) with `fvm`, although this time, add `flutter pub run` to be able to execute a script or program (in this case `melos`).

To avoid having to write the whole command every time, you maight want to create these aliases:

```bash
alias fvmbs="fvm flutter pub global run melos bs"
alias fvmbr="fvm flutter pub global run melos build_runner"
```

> FVM recommends installing a global version of the Flutter SDK... DON'T.
