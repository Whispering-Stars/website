<script lang="ts">
	import BlogCard from '$lib/components/BlogCard.svelte';
	import * as config from '$lib/config';
	import type { BlogArticle } from '$lib/types';

	export let data: {
		articles: BlogArticle[];
	};
</script>

<svelte:head>
	<title>{config.title} | Blog</title>
	<!-- meta data for the blog page where all the blog thumnails are displayed -->
</svelte:head>

<section>
	<ul class="flex flex-col items-center">
		{#each data.articles as article}
			<li class="m-4">
				<BlogCard {article} />
			</li>
		{/each}
	</ul>
</section>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.flamingo-pink);
	}
</style>
