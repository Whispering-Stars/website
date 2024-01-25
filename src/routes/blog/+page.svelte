<script lang="ts">
	import BlogCard from '$lib/components/BlogCard.svelte';
	import * as config from '$lib/config';
	import type { Article } from '$lib/types';

	export let data;
</script>

<svelte:head>
	<title>{config.title} | Blog</title>
	<meta name="description" content="A collection of blog posts by the Whispering Stars team." />
	<meta property="og:title" content="Blog" />
</svelte:head>

<section>
	{#if data.articles.length === 0}
		<p class="h-full text-center text-mariner text-xl font-semibold py-10">No blog posts yet!</p>
	{:else}
		<ul class="flex flex-col items-center">
			{#each data.articles as article}
				<li class="m-4">
					<BlogCard {article} />
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.flamingo-pink);
	}
</style>
