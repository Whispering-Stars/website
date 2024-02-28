<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import type { Article } from '$lib/types';
	import { formatDate } from '$lib/utils';

	export let article: Article;
</script>

<a href={`/${article.slug}`}>
	<figure
		class="w-80 max-h-144 rounded-lg overflow-auto shadow-ws-default bg-white-rock border-4 border-mariner"
	>
		<div class="bg-salmon border-b-4 border-mariner text-mariner font-semibold p-2">
			<h1 class="text-xl">{article.title}</h1>
			<small>
				{formatDate(article.date)}
			</small>
		</div>
		<img class="object-cover max-h-48 w-full opacity-90" src={article.cover} alt="" />
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
