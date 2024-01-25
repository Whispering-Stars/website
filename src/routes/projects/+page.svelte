<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import * as config from '$lib/config';
	import type { ProjectArticle } from '$lib/types';

	export let data: {
		articles: ProjectArticle[];
	};
</script>

<svelte:head>
	<title>{config.title} | Projects</title>
	<meta name="description" content="A collection of projects by the Whispering Stars team." />
	<meta property="og:title" content="Projects" />
</svelte:head>

<section>
	{#if data.articles.length === 0}
		<p class="h-full text-center text-mariner text-xl font-semibold py-10">No projects yet!</p>
	{:else}
		<ul class="flex flex-col items-center">
			{#each data.articles as article}
				<li class="m-4">
					<ProjectCard {article} />
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
