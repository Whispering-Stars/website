+++
title = "On fixing Dolibarr \"$isextrafieldmanaged must not be define\" error"
description = "How to fix \"$isextrafieldmanaged must not be define\" when migrating from one Dolibarr version to another"
date = 2024-06-04

[taxonomies]
tags = ["php", "dolibarr"]
categories = ["programming"]
+++

# The problem

Returning to an old branch may cause the following error:

```sh
Fatal error: Type of Class::$isextrafieldmanaged must not be defined (as in class Object) in C:\wamp64\www\dolibarr\htdocs\custom\module\class.class.php on line 0
```

# Correcting the problem

The simplest solution is to execute the following commands, in the relevant module folder:

```sh
git fetch origin
git merge remote/{needed branch}
```
