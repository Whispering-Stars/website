<script lang="ts">
	import ArrowUp from '$lib/icons/ArrowUp.svelte';
	import type { NavigationRoute } from '$lib/types';

	export let item: NavigationRoute;
	export let isHeader: Boolean = false;
	export let idx: Number;
	export let roundedTop: Boolean = false;
	export let roundedBottom: Boolean = false;

	function buildBorder() {
		if (isHeader) {
			return 'border-b-4';
		} else {
			if (idx == 0) {
				return `${roundedTop ? 'rounded-t-lg' : ''} border-4`;
			}
			return `${roundedBottom ? 'rounded-b-lg' : ''} border-b-4 border-l-4 border-r-4`;
		}
	}
</script>

<li class="min-h-12 h-12 bg-salmon {buildBorder()} border-mariner">
	<a href={item.path} class="h-full flex justify-between items-center mx-3">
		<p class="text-mariner font-semibold font-baloo font-3xl">{item.name}</p>
		<ArrowUp />
	</a>
</li>
