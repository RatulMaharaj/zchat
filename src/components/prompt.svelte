<script lang="ts">
	import type { UIMessage } from 'ai';
	// using the old syntax as @ai-sdk/svelte is not yet updated to support runes mode
	export let chatId: string;
	export let messages: UIMessage[];

	import Icon from './icon.svelte';
	import { z } from '$lib/z.svelte';

	let input = '';

	async function handleSubmit(e: Event, messageHistory: UIMessage[]) {
		e.preventDefault();
		await fetch(`/api/chat/${chatId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				chatId,
				messages: messageHistory
			})
		});
	}
</script>

<form
	class="bg-base-100 absolute right-0 bottom-0 left-0 min-h-20 w-full px-10 pb-4"
	on:submit={async (e) => {
		// first update the database
		const messageHistory = JSON.stringify([
			...messages,
			{
				role: 'user',
				content: input
			}
		]);

		await z.current.mutate.chats.update({
			id: chatId,
			messages: JSON.parse(messageHistory)
		});
		// clear the input
		input = '';
		// submit the form to trigger the completion on the server
		await handleSubmit(e, JSON.parse(messageHistory));
	}}
>
	<div
		class="textarea bg-base-100 flex h-20 w-full flex-row text-base focus-within:outline-none focus:outline-none"
	>
		<!-- svelte-ignore a11y_autofocus -->
		<input
			type="text"
			class="bg-base-100 h-full w-full border-none px-2 py-1 outline-none focus:border-none focus:outline-none"
			bind:value={input}
			placeholder="Message zchat"
			autofocus
		/>
		<button type="submit" class="btn btn-secondary btn-circle my-auto mr-4 h-8 w-8">
			<Icon name="send" size="size-4" />
		</button>
	</div>
</form>
