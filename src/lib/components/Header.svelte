<script lang="ts">
	import logo from '$lib/assets/ws_logo.svg';
	import Menu from '$lib/icons/Menu.svelte';
	import XMark from '$lib/icons/XMark.svelte';
	import NavButton from '$lib/components/NavButton.svelte';
	import { navigationRoutes } from '$lib/utils';

	let open: Boolean = false;

	function toggleMenu() {
		open = !open;
	}
</script>

<header class="bg-salmon min-h-12 max-h-24 h-12 lg:h-16 border-b-4 border-mariner">
	<div class="h-full flex mx-3 justify-between lg:justify-start items-center">
		<a href="/">
			<img
				class="w-8 h-8 lg:w-9 lg:h-9"
				src={logo}
				alt="Whispering Stars logo"
				loading="lazy"
				width="50"
				height="50"
			/>
		</a>
		<ul class="invisible lg:visible mx-4">
			{#each navigationRoutes as item}
				<a class="text-mariner font-semibold px-4 text-lg" href={item.path}>{item.name}</a>
			{/each}
		</ul>
		<button class="lg:hidden" on:click={toggleMenu}>
			{#if open}
				<XMark />
			{:else}
				<Menu />
			{/if}
		</button>
	</div>
</header>
{#if open}
	<ul class="z-10 absolute w-full">
		{#each navigationRoutes as item, idx}
			<NavButton {item} />
		{/each}
	</ul>
{/if}
