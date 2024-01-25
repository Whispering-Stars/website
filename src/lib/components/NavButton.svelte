<script lang="ts">
	import ArrowUp from '$lib/icons/ArrowUp.svelte';
	import type { NavigationRoute } from '$lib/types';

	export let item: NavigationRoute;
	export let last: boolean = false;

	function buildBorder() {
		if (!last) {
			return 'border-b-4 lg:border-b-0 lg:border-r-4';
		}
	}
</script>

<li class="min-h-12 h-12 lg:w-full bg-salmon {buildBorder()} border-mariner">
	<a href={item.path} class="h-full flex justify-between items-center mx-3">
		<p class="text-mariner font-semibold font-baloo text-lg lg:text-xl">{item.name}</p>
		<ArrowUp />
	</a>
</li>
