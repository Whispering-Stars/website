<script lang="ts">
	import type { BlogArticle } from '$lib/types';
	import Tag from '$lib/components/Tag.svelte';

	export let article: BlogArticle;
</script>

<figure class="w-80 max-h-72 shadow-ws-default bg-white-rock border-4 border-mariner">
	<div class="bg-salmon border-b-4 border-mariner p-2">
		<h1 class="text-center text-mariner text-xl font-semibold">{article.title}</h1>
	</div>
	<img class="object-cover max-h-20 w-full" src={article.cover} alt="" />
	<div class="m-4">
		<p class="max-h-24 mb-4 text-mariner overflow-ellipsis">{article.description}</p>
		<ul class="flex">
			{#each article.tags as tag}
				<li class="mr-4">
					<Tag text={tag} />
				</li>
			{/each}
		</ul>
	</div>
</figure>
