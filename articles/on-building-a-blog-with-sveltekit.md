---
title: On building a blog with SvelteKit
description: How I built this blog with SvelteKit and Markdown.
slug: on-building-a-blog-with-sveltekit
date: 2024-01-17
tags:
  - sveltekit
  - svelte
  - markdown
  - webdev
cover: /images/blog/on-building-a-blog-with-sveltekit/ws_logo_no_border.svg
type: blog
draft: false
---

I've written projects with [Flutter](https://flutter.dev/), [Vue](https://vuejs.org/) or [React](https://react.dev/) but for my new site, I wanted to try something else.

## Why a new website?

Before getting technical, let's talk a little about why I created a new site.

As it happens, I once had a personal site called [Killy.io](https://www.killy.io/). Unfortunately, I abandoned it when I started working. For a long time, all it displayed was a gradient and a "Coming back soon" message.

Now that I'm unemployed, I've rediscovered my passion for writing, and that's when I came up with the idea of creating a new site and turning it into a blog.

As well as being able to share my passions and what's on my mind, it will also allow me to deepen my knowledge by sharing what I learn with the Internet.

## Beautiful, retro and functional

I know that most of you are only interested in code, but I'd still like to take a look at the ideas and inspirations behind the design of this site.

First and foremost, I wanted a minimalist design to limit development time and avoid screen overload (functionality first).
In my search for inspiration, I came across this [design](https://mac-template.webflow.io/) by [Mackenzie Child](https://www.mackenziechild.me/), which reminded me of the early days of graphical user interfaces while adding a modern touch.

To complete the retro design and keep with the theme, I settled on the [SODA-CAP](https://lospec.com/palette-list/soda-cap) color palette by [Cappuchi](https://lospec.com/cpch01). It was a self-imposed constraint to have a limited palette, reminiscent of the 8-Bit era.

With all that in mind, here's the final design on Figma:

<div class="flex justify-center">
<img class="w-80 border-4 border-mariner rounded-lg" src='/images/blog/on-building-a-blog-with-sveltekit/WorldDesktop.png' alt='Whispering Stars design' loading="lazy" />
</div>

## Svelte & SvelteKit

### Svelte

Svelte is one of the new "cool kids" in JavaScript front-end frameworks, offering an alternative to React, Vue and other such frameworks.

Technically, the big difference between Svelte and the alternatives is that Svelte doesn't use a virtual DOM ([eli5](https://eli5.gg/Virtual%20DOM)), ([in detail](https://refine.dev/blog/react-virtual-dom/#components-of-the-virtual-dom)). In fact, Svelte is a compiler that takes the code in `.svelte` files and compiles it into optimized JS modules.

### SvelteKit

SvelteKit is an application framework based on Svelte. Like the alternatives [Next](https://nextjs.org/) for React or [Nuxt](https://nuxt.com/) for Vue, its aim is to provide solutions to the problems associated with complex site creation (routing, SSR, data fetching, etc.).

### Creating the project

```sh:terminal
npm create svelte@latest website
```

With this command, a `website/` project is created. During the project's creation, I chose to use TypeScript because I like strong typing.

```sh:terminal
cd website
npm install
npm run dev
```

With these commands, I first place myself in the project folder, then retrieve the dependencies and finally launch a development server, which should normally be located at `localhost:5173`.

### Installing TailwindCSS

> **NOTE**: For more details, please refer to the official [documentation](https://tailwindcss.com/docs/guides/sveltekit)!

```sh:terminal
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

These commands are used to install the dependencies required for Tailwind to function correctly. The second command generates the files `tailwind.config.js` and `postcss.config.js`.

**NOTE**: To use TypeScript for the Tailwind config file, simply add the `--ts` parameter to the end of the second command.

```ts:tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    ...
    extend: {
      ...
    },
  },
  plugins: [],
} satisfies Config
```

The line we're interested in here is `content`, which lets Tailwind know which pages to switch to when generating the CSS file the project will use.

### The home page

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
		class="w-full min-h-4/5 flex flex-col justify-center items-center font-bold bg-white-rock border-b-4 border-mariner text-5xl font-baloo"
	>
		<h1 class="text-mariner mb-4">WHISPERING</h1>
		<h1 class="text-salmon">STARS</h1>
	</div>
	<ul class="absolute z-10 w-72 bg-salmon left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
		{#each navigationRoutes as item, idx}
			<NavButton
				{item}
				{idx}
				roundedTop={idx === 0}
				roundedBottom={idx === navigationRoutes.length - 1}
			/>
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

```html:routes/+layout.svelte showLineNumbers
<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
</script>

<Header></Header>

<slot />

<Footer></Footer>
```

SvelteKit automatically creates routes based on the location of `+page.svelte` files.
Thus, the `routes/+page.svelte` file creates the `/` route, the `routes/blog/+page.svelte` file creates the `/blog` route.

The `+layout.svelte` file is used to share UI elements across several pages. At compile time, the `<slot />` element is replaced by the contents of the current page.

> **NOTE**: `+layout.svelte` files in subfolders do not replace the `routes/+layout.svelte` file, but are integrated into it at compile time.

### Display thumbnails of blog posts

````md:articles/blog/first-article.md
---
title: First article.
description: First article
slug: first-article
date: 2024-01-01
tags:
  - sveltekit
draft: false
---

# First article.

Hey there!

```ts
function heyThere() {
  console.log("Hey there!")
}
```
````

Articles are presented in two parts: the first, at the very top of the file between `---`, are metadata, the information we need for thumbnails. The second is the actual content of the article.

```ts:lib/articles
async function parseMarkdownFiles(folder: string) {
    try {
        const articles: any[] = []
        const articlesPath = path.resolve(`articles/${folder}`)
        const folders = await fs.readdir(articlesPath)

        for (const folder of folders) {
            const markdownFilePath = path.join(articlesPath, `${folder}`)
            const markdownContent = await fs.readFile(markdownFilePath, 'utf-8')
            const { data } = matter(markdownContent)

            articles.push(data)
        }

        return articles
    } catch (e) {
        throw new Error(`Error parsing markdown files: ${e}`)
    }
}
```

```ts:lib/articles.ts
export async function getBlogArticles() {
    let articles: BlogArticle[] = await parseMarkdownFiles('blog')

    articles = articles
        .filter((article) => !article.draft)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return articles
}
```

To retrieve articles and metadata, I use Node's `fs` module to loop over all files and read them.
Once the file contents have been retrieved, the `graymatter` package (`matter()`) separates the metadata from the rest of the article.

> **NOTE**: It's also possible to use `import.meta.glob(..., {eager:true})` which comes preinstalled with Vite but, for reasons I still haven't been able to resolve, it doesn't work for me.

```ts:routes/+page.server.ts
import { ..., getBlogArticles, ... } from '$lib/articles';
import type { ..., BlogArticle, ... } from '$lib/types';

export async function load() {
    const projectArticles: ProjectArticle[] = await getProjectsArticles()
    ...

    return { ..., blogArticles, ... }
}
```

```ts:routes/+page.svelte
<script lang="ts">
  ...
	import BlogCard from '$lib/components/BlogCard.svelte';
  ...
	import type { ..., BlogArticle, ... } from '$lib/types';
	...

	export let data: {
    ...,
		blogArticles: BlogArticle[];
    ...
	};

  ...
	const filteredBlogArticles = data.blogArticles.slice(0, 3);
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

The `+page.server.ts` is an interesting feature of SvelteKit, allowing data to be accessed from the nearest `+page.svelte` without exposing it to the client. The link between the two files is made via the `data` object.

> **NOTE**: It is possible to let TypeScript infer the type of `data`, `export let data;`.

### Display article

```ts:lib/articles.ts
async function markdownToHtml(markdown: string) {
    const { content, data } = matter(markdown)

    const result = await unified()
        .use(remarkParse)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeFormat)
        .use(rehypeCodeTitles)
        .use(rehypePrism)
        .use(rehypeStringify).process(content)

    return {
        content: result.value as string,
        frontmatter: data as Frontmatter
    }
}
```

```ts:lib/articles.ts
export async function getBlogArticle(slug: string) {
    try {
        const articlePath = path.resolve(`articles/blog/${slug}.md`)
        const markdownContent = await fs.readFile(articlePath, 'utf-8')
        return markdownToHtml(markdownContent)
    } catch (e) {
        throw new Error(`Error parsing markdown file: ${e}`)
    }
}
```

To retrieve the content of Markdown articles, I use the `remark` (Markdown ecosystem) and `rehype` (HTML ecosystem) plugins.
In the `markdownToHtml` function, I first retrieve the entire file content, metadata + article with `graymatter` as seen in the previous section.

What we're interested in here is the `content` part of `graymatter`.
To keep things simple, `content` will go through a number of operations that will first convert it into HTML code, then certain elements will be applied such as adding titles to code blocks (`rehype-code-titles`) and highlighting code blocks (`rehype-prism-plus`).

Once all these operations have been performed, I retrieve the freshly created HTML content and return it as a string with the metadata in a separate object (`frontmatter: data as Frontmatter`).

```html:routes/blog/[slug]/+page.svelte
<script lang="ts">
	import { formatDate } from '$lib/utils';

	import '../../../article.css';
	import '../../../code.css';
	import '../../../prism-laserwave.css';

	export let data;

	const { content, frontmatter } = data.article;
</script>

...

<article class="flex justify-center py-10">
	<div
		class="w-80 sm:w-3/4 xl:w-1/2 rounded-lg overflow-auto prose bg-white-rock shadow-ws-default border-4 border-mariner"
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
The page for the blog posts is `blog/[slug]/+page.svelte`. As mentioned above, SvelteKit relies on the presence of a `+page.svelte` file to determine which folders are routes and which are not.
Here, SvelteKit uses the route passed in the `<a>` tag of the `BlogCard` component to determine the route.

```html:lib/components/BlogCard.svelte
...

<a href={`/blog/${article.slug}`}>
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

So for a `/blog/${article.slug}` route whose slug is `first-article`, SvelteKit will determine the route `/blog/first-article`.

To use the data retrieved earlier, simply do the same as for using metadata for thumbnails on the home page.

Once the data is available, all that's left to do is display it. SvelteKit provides the `@html` tag to deserialize our HTML content string.

And that's it, now all we have to do is style the whole thing with CSS, and we're done.

## Conclusion

The good thing about unemployment is that it gives you time to learn new things. Svelte and SvelteKit are probably the best surprises for me in the JS front-end framework ecosystem.

There are still a few elements missing from this site that I haven't implemented at the time of writing this article, such as transitions, a site map, an RSS feed and others. But I'll be sure to add them as I explore Svelte and SvelteKit.