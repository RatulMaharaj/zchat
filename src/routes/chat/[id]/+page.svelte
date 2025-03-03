<script lang="ts">
	import Chat from '$components/chat.svelte';
	import Header from '$components/header.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header />
{#if data?.id}
	<Chat chatId={data?.id} />
{/if}
