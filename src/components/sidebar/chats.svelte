<script lang="ts">
	import { Query } from 'zero-svelte';
	import { z } from '$lib/z.svelte';
	let { userId, filter = $bindable() }: { userId: string; filter: string } = $props();

	let chats = $derived(
		new Query(
			z.current.query.chats
				.where('userId', userId)
				.where('title', 'ILIKE', `%${filter}%`)
				.orderBy('createdAt', 'desc')
		)
	);
</script>

<input
	type="text"
	class="input input-neutral focus:outline-none"
	bind:value={filter}
	placeholder="Search"
/>
{#if chats.current.length > 0}
	<strong class="text-base-content my-2 w-full pl-2 text-left text-sm">Chats</strong>
{/if}

{#each chats.current as chat (chat.id)}
	<li class="w-full">
		<a href="/chat/{chat.id}">
			<p title={chat?.title} class="w-full overflow-hidden text-ellipsis whitespace-nowrap">
				{chat?.title}
			</p>
		</a>
	</li>
{/each}
