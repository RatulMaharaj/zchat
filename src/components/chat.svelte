<script lang="ts">
	import { z } from '$lib/z.svelte';
	import { Query } from 'zero-svelte';
	import Prompt from './prompt.svelte';
	import SvelteMarkdown from 'svelte-markdown';

	const {
		chatId
	}: {
		chatId: string;
	} = $props();

	const chat = new Query(z.current.query.chats.one().where('id', chatId));
	console.log(chat);
</script>

<div class="h-full flex-grow overflow-y-scroll px-10">
	{#if chat.current?.messages}
		<ul>
			{#each chat.current?.messages as message, index (index)}
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
<Prompt {chatId} />
