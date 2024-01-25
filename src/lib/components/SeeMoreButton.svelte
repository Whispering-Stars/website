<script lang="ts">
	export let text: string;
	export let path: string;
</script>

<a
	class="w-fit bg-salmon rounded-lg border-4 border-mariner shadow-ws-default text-mariner font-semibold text-lg px-4 py-2 my-8"
	href={path}
>
	{text}
</a>
