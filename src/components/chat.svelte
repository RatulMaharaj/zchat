<script lang="ts">
	import { z } from '$lib/z.svelte';
	import Prompt from './prompt.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { Query } from 'zero-svelte';

	let {
		chatId
	}: {
		chatId: string;
	} = $props();

	let chats = new Query(z.current.query.chats);
	let selectedChat = $derived(chats.current.find((chat) => chat.id === chatId));
</script>

<div id="chat" class="h-full flex-grow overflow-y-scroll px-10">
	{#if selectedChat?.messages && selectedChat?.messages.length > 0}
		<ul>
			{#each selectedChat?.messages as message, index (index)}
				{#if message.role === 'user'}
					<li class="chat chat-end">
						<div class="chat-bubble chat-bubble-neutral">{message.content}</div>
					</li>
				{:else if message.role === 'assistant'}
					<li class="chat chat-start">
						<div class="flex w-full flex-col gap-y-4 leading-7">
							<SvelteMarkdown source={message.content} />
						</div>
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</div>
<Prompt {chatId} messages={selectedChat?.messages ?? []} />
