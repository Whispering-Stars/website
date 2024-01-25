<script lang="ts">
	import { page } from '$app/stores';
</script>

<div
	class="w-full h-144 flex flex-col justify-center items-center font-bold bg-white-rock text-5xl lg:text-6xl font-baloo"
>
	<h1 class="text-mariner mb-2">{$page.status}</h1>
	<p class="text-salmon">{$page.error?.message}</p>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.flamingo-pink);
	}
</style>
