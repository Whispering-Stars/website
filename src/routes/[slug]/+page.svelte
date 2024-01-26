<script lang="ts">
	import { formatDate } from '$lib/utils';

	import '../../article.css';
	import '../../code.css';
	import '../../prism-laserwave.css';

	export let data;

	const { content, frontmatter } = data.article;
</script>

<svelte:head>
	<title>{frontmatter.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={frontmatter.title} />
	<meta property="og:description" content={frontmatter.description} />
</svelte:head>

<article class="flex justify-center py-10">
	<div
		class="w-80 sm:w-3/4 xl:w-1/3 rounded-lg overflow-auto prose bg-white-rock shadow-ws-default border-4 border-mariner"
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

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.flamingo-pink);
	}
</style>
