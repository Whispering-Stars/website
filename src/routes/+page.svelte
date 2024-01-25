<script lang="ts">
	import NavButton from '$lib/components/NavButton.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import SeeMoreButton from '$lib/components/SeeMoreButton.svelte';
	import TeamCard from '$lib/components/TeamCard.svelte';

	import { navigationRoutes } from '$lib/utils';
	import * as config from '$lib/config';

	export let data;

	const filteredProjectArticles = data.projectsArticles
		.filter((e) => e.type == 'projects')
		.slice(0, 3);
	const filteredBlogArticles = data.blogArticles.filter((e) => e.type == 'blog').slice(0, 3);
	const filteredTeamArticles = data.teamArticles.filter((e) => e.type == 'team').slice(0, 3);
</script>

<svelte:head>
	<title>{config.title}</title>

	<meta property="og:title" content={config.title} />
	<meta property="og:description" content={config.description} />
	<meta property="og:url" content={config.url} />
</svelte:head>

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

<section class="flex flex-col items-center py-4">
	<ul class="flex flex-col items-center">
		{#each filteredProjectArticles as article}
			<li class="m-4">
				<ProjectCard {article} />
			</li>
		{/each}
	</ul>
	{#if data.projectsArticles.length > 4}
		<SeeMoreButton text="See more projects" path="/projects" />
	{/if}
</section>

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

<section class="flex flex-col items-center py-4">
	<ul>
		{#each filteredTeamArticles as article}
			<li class="m-4">
				<TeamCard {article} />
			</li>
		{/each}
	</ul>
	{#if data.teamArticles.length > 4}
		<SeeMoreButton text="Meet the team" path="/team" />
	{/if}
</section>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.flamingo-pink);
	}
</style>
