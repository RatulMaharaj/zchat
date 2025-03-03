<script lang="ts">
	import Chat from '$components/chat.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{#if data?.id}
	<Chat chatId={data?.id} />
{/if}
