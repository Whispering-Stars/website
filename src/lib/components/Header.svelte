<script lang="ts">
	import logo from '$lib/assets/ws_logo_no_border.svg';
	import Menu from '$lib/icons/Menu.svelte';
	import XMark from '$lib/icons/XMark.svelte';
	import NavButton from '$lib/components/NavButton.svelte';
	import { navigationRoutes } from '$lib/utils';

	let open: Boolean = false;

	function toggleMenu() {
		open = !open;
	}
</script>

<header class="bg-salmon min-h-12 max-h-24 h-12 border-b-4 border-mariner">
	<div class="h-full flex mx-3 justify-between items-center">
		<a href="/">
			<img
				class="w-7 h-7 rounded-sm shadow-ws-sm"
				src={logo}
				alt="Whispering Stars logo"
				loading="lazy"
				width="25"
				height="25"
			/>
		</a>
		<button on:click={toggleMenu}>
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
			<NavButton {item} isHeader={true} {idx} />
		{/each}
	</ul>
{/if}
