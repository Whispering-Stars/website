---
title: On building a blog with SvelteKit
description: A retrospective on building a blog with SvelteKit and Markdown - covering the my motivations, technical implementation, code samples, and reflections.
slug: on-building-a-blog-with-sveltekit
date: 2024-01-17
tags:
  - sveltekit
  - svelte
  - markdown
  - webdev
cover: /images/blog/on-building-a-blog-with-sveltekit/ws_logo.svg
type: blog
draft: false
---

I’ve built websites and applications using frameworks like [React](https://react.dev/), [Vue](https://vuejs.org/), and [Flutter](https://flutter.dev/). But for my latest project – a new website – I wanted to try something else.

In this post, I’ll walk through how I built the site, covering motivation, implementation details, and reflections on using Svelte & SvelteKit.

> **NOTE**: I know that most of you are only interested in code, but I'd like to take a minute to look back at the reason for this new website and the ideas and inspirations behind it's design.

## Why a new website?

As it happens, I once had a personal site called [Killy.io](https://www.killy.io/). Unfortunately, I abandoned it when I started working. For a long time, all it displayed was a gradient and a "Coming back soon" message.

Now that I'm unemployed, I've rediscovered my passion for writing, and took the opportunity to create a blog.

As well as being able to share my passions and what's on my mind, it will allow me to deepen my knowledge by sharing what I learn with the Internet.

## Beautiful, retro and functional

I wanted a clean, minimalist design to avoid visual clutter.
While searching for inspiration, I came across this [retro design](https://mac-template.webflow.io/) by [Mackenzie Child](https://www.mackenziechild.me/), which reminded me of the early days of UIs while adding a modern touch.

To complement the aesthetic,  went with the retro [SODA-CAP](https://lospec.com/palette-list/soda-cap) palette by [Cappuchi](https://lospec.com/cpch01). The limited colors reminded me of 8-bit games from my childhood.

Here's a look at the final design:

<div class="flex justify-center">
<img class="w-80 border-4 border-mariner rounded-lg" src='/images/blog/on-building-a-blog-with-sveltekit/WorldDesktop.png' alt='Whispering Stars design' loading="lazy" />
</div>

## Why Svelte & SvelteKit?

Svelte is a new-ish JavaScript framework that interested me.
Rather than using a virtual DOM like React, Svelte is a compiler that takes your code and optimizes it into lean, high-performance JavaScript modules.

SvelteKit is a web app framework built on top of Svelte, similar to [Next](https://nextjs.org/) or [Nuxt](https://nuxt.com/). It provides routing, server-side rendering, and other features needed for complex sites.

I was drawn by the clear and concise syntax. To hell with the annoying obligatory methods, data declaration and such, just write what is needed and nothing else.

## Building the website

To create the project, I ran:

```sh:terminal
npm create svelte@latest website
cd website
npm install
npm run dev
```

This generated the starter files I needed. I chose to use TypeScript for strong typing

After installing dependencies and starting the dev server, I was ready to build.

### Configuring TailwindCSS

> **NOTE**: For more details, please refer to the official [documentation](https://tailwindcss.com/docs/guides/sveltekit)!

To use Tailwind, I installed the necessary packages and generated the config files:

```sh:terminal
npm install -D tailwindcss postcss autoprefixer # add `--ts` to use TypeScript
npx tailwindcss init -p
```

```ts:tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'], // files to watch
  theme: { // use this scope to override the default values with custom ones
    ...
    extend: { // use this scope to add custom values to the default ones
      ...
    },
  },
  plugins: [],
} satisfies Config
```

### Creating the homepage

The main Svelte code for my homepage:

```html:routes/+page.svelte
<script lang="ts">
	import NavButton from '$lib/components/NavButton.svelte';
  ...
	import SeeMoreButton from '$lib/components/SeeMoreButton.svelte';
	import { navigationRoutes } from '$lib/utils';
  ...
</script>

<section class="h-144">
	<div
		class="w-full min-h-4/5 flex flex-col justify-center items-center font-bold bg-white-rock border-b-4 border-mariner text-5xl lg:text-6xl font-baloo"
	>
		<h1 class="text-mariner mb-2">WHISPERING</h1>
		<h1 class="text-salmon">STARS</h1>
	</div>
	<ul
		class="absolute z-10 w-72 lg:w-1/2 2xl:w-1/4 bg-salmon left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto border-4 border-mariner rounded-md lg:flex lg:justify-center"
	>
		{#each navigationRoutes as item, idx}
			<NavButton {item} last={idx == navigationRoutes.length - 1} />
		{/each}
	</ul>
</section>

...

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.flamingo-pink);
	}
</style>
```

SvelteKit automatically creates routes based on the location of `+page.svelte` files. `routes/+page.svelte` creates the route `/`, `routes/blog/+page.svelte` creates the route `/blog`.

I used +layout.svelte to share common UI elements:

```html:routes/+layout.svelte
<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
</script>

<Header></Header>

<slot />

<Footer></Footer>
```

`+layout.svelte` is used to share UI elements across pages. At compile time, the `<slot />` element is replaced by the contents of the current page.

### Displaying blog posts

To display post thumbnails on the homepage, I imported my Markdown articles and parsed out the metadata I needed:

````md:articles/blog/first-article.md
<!--- metadata -->
---
title: First article.
description: First article
slug: first-article
date: 2024-01-01
tags:
  - sveltekit
draft: false
---

<!--- content -->

# First article.

Hey there!

```ts
function heyThere() {
  console.log("Hey there!")
}
```
````

```ts:lib/articles.ts
async function parseMarkdownFiles(type?: string) {
    try {
        const articles: any[] = []
        const articlesPath = path.resolve('articles') // find the articles folder at the root of the project
        const folders = await fs.readdir(articlesPath) // get all the files in this folder

        for (const e of folders) {
            const markdownFilePath = path.join(articlesPath, `${e}`) // create the full path for each files
            const markdownContent = await fs.readFile(markdownFilePath, 'utf-8')
            const { data } = matter(markdownContent) // extract the metadata

            if (typeof type !== 'undefined' && data.type !== type) {
                continue
            } // does only apply for specific pages (blog/projects/team)

            articles.push(data)
        }

        return articles
    } catch (e) {
        throw new Error(`Error parsing markdown files: ${e}`)
    }
}

...

export async function getArticles(type?: string) {
    let articles: Article[] = await parseMarkdownFiles(type)

    articles = articles
        .filter((article) => !article.draft) // keep only published articles
        .sort((a, b) => a.name.localeCompare(b.name)) // sort by newest

    return articles
}
```

I filtered and sorted the posts to only show published ones ordered by date.

> **NOTE**: It's possible to use `import.meta.glob(..., {eager:true})` which comes preinstalled with Vite but, for reasons I still haven't been able to solve, it doesn't work for me.

I passed the articles data to the homepage through my homepage server:

```ts:routes/+page.server.ts
import { getArticles } from '$lib/articles';
import type { Article } from '$lib/types';

export async function load() {
    const articles: Article[] = await getArticles()

    return {
        projectsArticles: articles.filter((article) => article.type === 'projects'),
        blogArticles: articles.filter((article) => article.type === 'blog'),
        teamArticles: articles.filter((article) => article.type === 'team'),
    }
}
```

```html:lib/components/BlogCard.svelte
<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import type { Article } from '$lib/types';
	import { formatDate } from '$lib/utils';

	export let article: Article;
</script>

<a href={`/${article.slug}`}>
	<figure
		class="w-80 max-h-128 rounded-lg overflow-auto shadow-ws-default bg-white-rock border-4 border-mariner"
	>
		<div class="bg-salmon border-b-4 border-mariner text-mariner font-semibold p-2">
			<h1 class="text-xl">{article.title}</h1>
			<small>
				{formatDate(article.date)}
			</small>
		</div>
		<img class="object-cover max-h-36 w-full opacity-90" src={article.cover} alt="" />
		<div class="m-4">
			<p class="max-h-64 mb-4 text-mariner overflow-ellipsis">{article.description}</p>
			<ul class="grid gap-2 grid-cols-2">
				{#each article.tags as tag}
					<li>
						<Tag text={tag} />
					</li>
				{/each}
			</ul>
		</div>
	</figure>
</a>
```

```ts:routes/+page.svelte
<script lang="ts">
	...
	export let data; // homepage server data
	...
	const filteredBlogArticles = data.blogArticles.slice(0, 3); // I want to only display a maximun of 4 posts
	...
</script>

...

<section class="flex flex-col items-center bg-white-rock border-y-4 border-mariner py-4">
	<ul class="flex flex-col items-center">
		{#each filteredBlogArticles as article}
			<li class="m-4">
				<BlogCard {article} />
			</li>
		{/each}
	</ul>
	{#if data.blogArticles.length > 4}
		<SeeMoreButton text="See more articles" path="/blog" />
	{/if}
</section>

...
```

The `BlogCard` takes in `Article` object and displays the title, description, date, cover and tags.

### Displaying full articles

To display an article, I had to convert the Markdown content to HTML:

```ts:lib/articles.ts
async function markdownToHtml(markdown: string) {
    const { content, data } = matter(markdown) // extract metadata & content

    const result = await unified()
        .use(remarkParse) // parse the content to a syntax tree
        .use(remarkRehype, { allowDangerousHtml: true }) // turn the syntax tree to HTML. {allowDangerousHtml: true} to keep the HTML inside the Markdown
        .use(rehypeRaw)
        .use(rehypeFormat) // format the HTML
        .use(rehypeCodeTitles) // add titles to code blocks
        .use(rehypePrism) // add code highlight
        .use(rehypeStringify).process(content)

    return {
        content: result.value as string,
        frontmatter: data as Frontmatter
    }
}

async function parseMarkdownFile(slug: string) {
    try {
        const articlePath = path.resolve(`articles/${slug}.md`)
        const markdownContent = await fs.readFile(articlePath, 'utf-8')
        return markdownToHtml(markdownContent)
    } catch (e) {
        throw new Error(`Error parsing markdown file: ${e}`)
    }
}
```

I used the slug passed in from the `BlogCard` to dynamically generate the article route.

SvelteKit made this easy - I just had to create `routes/[slug]/+page.svelte ` and access the parsed article data.

From there, I passed the HTML content to `@html` and rendered the full article!

```html:routes/[slug]/+page.svelte
<script lang="ts">
	import { formatDate } from '$lib/utils';

	import '../../article.css';
	import '../../code.css';
	import '../../prism-laserwave.css';

	export let data;

	const { content, frontmatter } = data.article;
</script>

<svelte:head>
	<title>{frontmatter.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={frontmatter.title} />
	<meta property="og:description" content={frontmatter.description} />
</svelte:head>

<article class="flex justify-center py-10">
	<div
		class="w-80 sm:w-3/4 xl:w-1/3 rounded-lg overflow-auto prose bg-white-rock shadow-ws-default border-4 border-mariner"
	>
		<header
			class="lg:h-40 text-mariner font-semibold bg-cover bg-center bg-no-repeat bg-opacity-5"
			style={`background-image:linear-gradient(rgba(255, 125, 110, .9), rgba(232, 231, 203, .95)), url(${frontmatter.cover})`}
		>
			<div class="p-4 lg:py-10 lg:px-5">
				<h1 class="text-2xl lg:text-3xl mb-4">{frontmatter.title}</h1>
				<small class="">{formatDate(frontmatter.date)}</small>
			</div>
		</header>
		<div class="p-4 lg:p-5">
			{@html content}
		</div>
	</div>
</article>

...
```

## Conclusion

The good thing about unemployment is that it gives you time to learn new things. Svelte and SvelteKit are probably the best surprises for me in the JS front-end framework ecosystem.

There are still a few elements missing from this website that I haven't implemented at the time of writing this article. But I'll be sure to add them as I explore Svelte and SvelteKit.