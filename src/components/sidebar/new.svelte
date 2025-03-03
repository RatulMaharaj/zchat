<script lang="ts">
	import { createNewChat } from '$lib/helpers.svelte';
</script>

<li class="mb-4 w-full">
	<button
		class="btn btn-accent"
		onclick={async () => {
			await createNewChat();
		}}>New Chat</button
	>
</li>
