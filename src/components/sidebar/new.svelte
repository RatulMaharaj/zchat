<script lang="ts">
	import { user } from '$lib/store.svelte';
	import { z } from '$lib/z.svelte';
	import { nanoid } from 'nanoid';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
</script>

<li class="mb-4 w-full">
	<button
		class="btn btn-accent"
		onclick={async () => {
			const id = nanoid();
			if (user.current?.sub && user.current?.sub !== 'anon') {
				const newChat = {
					id,
					messages: [],
					userId: user.current?.sub
				};
				await z.current.mutate.chats.insert(newChat);
				// navigate to the new chat page
				goto(`/chat/${id}`);
			} else {
				toast.error('Login required');
			}
		}}>New Chat</button
	>
</li>
