<script lang="ts">
	import { formatDate } from '$lib/utils';

	import '../../../article.css';
	import '../../../code.css';

	export let data;

	const { content, frontmatter } = data.article;
</script>

<main class="flex justify-center py-10">
	<article class="w-80 prose bg-white-rock shadow-ws-default border-4 border-mariner">
		<header
			class="text-mariner font-semibold bg-cover bg-center bg-no-repeat bg-opacity-5"
			style={`background-image:linear-gradient(rgba(255, 125, 110, .9), rgba(232, 231, 203, .95)), url(${frontmatter.cover})`}
		>
			<div class="p-4">
				<h1 class="text-2xl mb-4">{frontmatter.title}</h1>
				<small class="">{formatDate(frontmatter.date)}</small>
			</div>
		</header>
		<div class="p-4">
			{@html content}
		</div>
	</article>
</main>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.flamingo-pink);
	}
</style>
