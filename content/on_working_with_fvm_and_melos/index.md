+++
title = "on working with fvm & melos"
date = 2024-06-04

[taxonomies]
tags = ["flutter", "fvm", "melos"]
categories = ["bug fixes"]
+++

I've been using FVM and Melos for a while now, however a problem occurs every time I change computers.

The error (without giving too many details) is actually that when I use Melos following the instructions on their site, it seems to look for a version of the Dart SDK that would be installed globally.

So here's how I solve this problem every time.

# Installing Melos

On the Melos website, it says to use the command `dart pub global activate melos`. Of course, if I were using a global version of the Dart SDK this wouldn't be a problem, but I want to use FVM.

To do this, simply prefix the previous command with `fvm`. Thus, the final command is :

```sh
fvm dart pub global activate melos
```

# Using Melos

Now that Melos is installed and activated with FVM, it's time to use it. If I use the `melos bs` command to retrieve packages as indicated in the documentation, Melos will try to use the global version of the Dart SDK (if it exists at all, of course).

To use the version of the Dart SDK installed by FVM, we need to add the following command `fvm flutter pub global run`, so the final command will look like this:

```sh
fvm flutter pub run melos bs
```

Personally, I find that adding `fvm flutter pub run` to all Melos commands is tiresome, which is why I recommend creating aliases if you're on Linux or MacOS:

Here are mine, for example:

```bash
alias fvmbs="fvm flutter pub global run melos bs"
alias fvmbr="fvm flutter pub global run melos build_runner"
```

I therefore recommend that you remove all versions of the Flutter and Dart SDKs from your computer and install them per project with FVM.

> FVM recommends installing a global version of the Flutter SDK, but personally, this has brought me nothing but problems. Do so at your own risk.
