<script>
	import * as config from '$lib/config';

	let year = new Date().getFullYear();
</script>

<footer
	class="w-full h-20 flex flex-col justify-center items-center bg-white-rock border-t-4 border-mariner"
>
	<p class="text-mariner font-semibold font-baloo">&copy {year} {config.title}</p>
	<small class="">Powered by SvelteKit</small>
</footer>
