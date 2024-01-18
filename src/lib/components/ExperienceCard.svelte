<script lang="ts">
	import ArrowUp from '$lib/icons/ArrowUp.svelte';
	import type { ExperienceArticle } from '$lib/types';

	export let article: ExperienceArticle;
</script>

<figure class="w-80 shadow-ws-default border-4 border-mariner">
	<img class="object-cover max-h-60 w-full opacity-90" src={article.cover} alt="" />
	<div class="border-y-4 border-mariner bg-flamingo-pink p-2 text-center">
		<h1 class="text-mariner font-semibold text-2xl">{article.name}</h1>
		<h2 class="text-mariner font-semibold">{article.position}</h2>
	</div>
	<a class="flex justify-between bg-salmon p-2" href="/">
		<p class="text-mariner font-semibold">Learn more</p>
		<ArrowUp />
	</a>
</figure>
