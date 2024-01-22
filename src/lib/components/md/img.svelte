<script lang="ts">
	export let src: string;
	export let alt: string;
</script>

<img class="border-4 border-mariner rounded-lg" {src} {alt} loading="lazy" />
