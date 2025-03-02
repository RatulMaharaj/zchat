<script lang="ts">
	// using the old syntax as @ai-sdk/svelte is not yet updated to support runes mode
	export let chatId: string;
	import { useChat } from '@ai-sdk/svelte';
	import Icon from './icon.svelte';
	const { input, handleSubmit } = useChat({
		api: `/api/chat/${chatId}`
	});
</script>

<form
	class="bg-base-100 absolute right-0 bottom-0 left-0 min-h-20 w-full px-10 pb-4"
	on:submit={(e) => {
		handleSubmit(e);
	}}
>
	<div
		class="textarea bg-base-100 flex h-20 w-full flex-row focus-within:outline-none focus:outline-none"
	>
		<input
			type="text"
			class="bg-base-100 h-full w-full border-none px-2 py-1 outline-none focus:border-none focus:outline-none"
			bind:value={$input}
			placeholder="Message zchat"
		/>
		<button class="btn btn-secondary btn-circle my-auto mr-4 h-8 w-8" type="submit">
			<Icon name="send" size="size-4" />
		</button>
	</div>
</form>
