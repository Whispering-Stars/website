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
draft: false
---

J'ai ecris des projets avec [Flutter](), [Vue]() ou encore [React]() mais pour mon nouveau site, je voulais essayer quelque chose de nouveau.
C'est a ce moment la que j'ai decouvert [Svelte]() et [SvelteKit]().

## Pourquoi un nouveau site ?

Avant d'entree dans la technique, parlons un peu de la raison pour laquelle j'ai creer un nouveau site.

Il se trouve que fut un temps j'avais un site personnel nomme [Killy.io](). Malheureusement, je l'ai abandonne lorsque j'ai commence a travailler. Pendant un long moment, il n'affichait plus qu'un gradient et un message "Coming back soon".

Maintenant que je suis au chomage, je me suis retrouve une passion pour l'ecriture et c'est la que m'est venu l'idee de creer un nouveau site et en faire un blog.

En plus de pouvoir partager mes passions et ce qui me passe par la tete, ca me permettra egalement d'approfondir mes connaissances en partageant ce que j'apprends avec les Internet.

## Du beau, du retro et du fonctionnel

Je sais que la plupart d'entre vous ne sont interesse que par le code, cependant j'aimerais quand meme faire un tour par les idees et les inspiration derriere le design de ce site.

Avant tout je voulais un design minimaliste pour limiter le temps de developpement et eviter la surcharge d'element a l'ecran (le fonctionnel avant tout).
Dans ma recherche d'inpiration, je suis tombe sur ce [design](https://mac-template.webflow.io/) de [Mackenzie Child](https://www.mackenziechild.me/) qui me rappellait les debuts des interfaces graphique tout en apportant une touche moderne.

Pour parfaire le design retro et reste dans le theme, je me suis arrete sur la palette de couleur [SODA-CAP](https://lospec.com/palette-list/soda-cap) par [Cappuchi](https://lospec.com/cpch01). C'est une contrainte que me suis impose a moi-mem d'avoir une palette limite qui rappelle l'epoque 8-Bit.

Et avec tout ca en tete, voici le design final sur Figma:

<div class="flex justify-center">
<img class="w-80 border-4 border-mariner rounded-lg" src='/images/blog/on-building-a-blog-with-sveltekit/WorldDesktop.png' alt='Whispering Stars design' loading="lazy" />
</div>

## Svelte & SvelteKit

### Svelte

Svelte est l'un des nouveaux "cool kids" des framework front-end Javascript qui se veut une alternatives aux React, Vue et autres framework du genre.

Techniquement la grosse difference entre Svelte et les alternatives est que Svelte n'utilise pas de DOM virtuel ([eli5](https://eli5.gg/Virtual%20DOM)), ([en details](https://refine.dev/blog/react-virtual-dom/#components-of-the-virtual-dom)). En fait Svelte est un compilateur qui va prendre le code dans les fichier `.svelte` et le compiler en modules JS optimises.

Je l'ai personnellement choisi pour sa simplicite.

### SvelteKit

SvelteKit est framework d'application base sur Svelte. Comme les alternatives [Next]() pour React ou [Nuxt]() pour Vue, son but est d'apporter des solutions aux problemes lies a la creation de site complexe (routage, SSR, prerendu, recuperation des donnees, etc).

### Creation du projet SvelteKit

> **NOTE**: La partie suivante presuppose que vous avez [Node]() deja installe sur votre machine.

Pour creer une projet `SvelteKit`, c'est assez simplement, sur votre terminal prefere, entrer:

```console
npm create svelte@latest my-app
```

Une fois le projet creer, entrez les commandes suivantes:

```console
cd my-app
npm install
npm run dev
```

Ces commandes permettent de telecharger les dependances et de lancer un serveur de developpement. Si tout s'est bien passe, vous devriez avoir une page d'accueil Svelte a l'adresse `localhost:5713`.