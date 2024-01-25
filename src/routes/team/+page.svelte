<script lang="ts">
	import TeamCard from '$lib/components/TeamCard.svelte';
	import * as config from '$lib/config';
	import type { TeamArticle } from '$lib/types';

	export let data: {
		articles: TeamArticle[];
	};
</script>

<svelte:head>
	<title>{config.title} | Team</title>
	<meta name="description" content="A collection of team members of the Whispering Stars team." />
	<meta property="og:title" content="Team" />
</svelte:head>

<section>
	{#if data.articles.length === 0}
		<p class="h-full text-center text-mariner text-xl font-semibold py-10">No team members yet!</p>
	{:else}
		<ul class="flex flex-col items-center">
			{#each data.articles as article}
				<li class="m-4">
					<TeamCard {article} />
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
