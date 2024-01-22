---
title: On building a blog with SvelteKit
description: Comment créer un blog statique avec SvelteKit et utiliser Markdown pour les articles de blog.
slug: on-building-a-blog-with-sveltekit
date: 2024-01-17
tags:
  - sveltekit
  - svelte
  - markdown
  - webdev
cover: /images/blog/on-building-a-blog-with-sveltekit/ws_logo_no_border.svg
draft: true
---

J'ai ecris des projets avec [Flutter](), [Vue]() ou encore [React]() mais pour mon nouveau site, je voulais essayer quelque chose de nouveau.
C'est a ce moment la que j'ai decouvert [Svelte]() et [SvelteKit]().

## Pourquoi un nouveau site ?

Avant d'entree dans la technique, parlons un peu de la raison pour laquelle j'ai creer un nouveau site.

Il se trouve que fut un temps j'avais un site personnel nomme [Killy.io](). Malheureusement, je l'ai abandonne lorsque j'ai commence a travailler. Pendant un long moment, il n'affichait plus qu'un gradient et un message "Coming back soon".

Maintenant que je suis au chomage, je me suis retrouve une passion pour l'ecriture et c'est la que m'est venu l'idee de creer un nouveau site et en faire un blog.

En plus de pouvoir partager mes passions et ce qui me passe par la tete, ca me permettra egalement d'approfondir mes connaissances en partageant ce que j'apprends avec les Internet.

## Du beau et du fonctionnel

Je sais que la plupart d'entre vous ne sont interesse que par le code, cependant j'aimerais quand meme faire un tour par les idees et les inspiration derriere le design de ce site.

- Ce que je veux/Inspiration
-- Un style un peu jeu retro
-- Minimalisme
-- Palette limite
-- https://mac-template.webflow.io/
- Resultat final
-- Pas d'animation
-- Pas de titre pour les parties comme Mac

SvelteKit
- Qu'est-ce que c'est?
- Installation
-- Installer node/npm
-- Installer sveltekit
-- Creer le projet
- Le blog
-- Utiliser Markdown pour le page du blog
-- mdsvex
-- Petit probleme (Rollup)
-- Solution
--- Reecrire la recuperation des pages
- Les autres pages
-- Reutiliser le meme concept pour les autres pages en utilisants differents dossiers

Conclusion
- Resume des choix faits
- Pas un simple site portfolio
- Faite l'experience vous meme
