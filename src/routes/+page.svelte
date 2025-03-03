<script lang="ts">
	import { isAuthenticated, login } from '$lib/auth.svelte';
	import Header from '$components/header.svelte';
	import { createNewChat } from '$lib/helpers.svelte';
</script>

<Header />

{#if $isAuthenticated}
	<div class="flex h-full w-full items-center justify-center text-center text-sm">
		<button type="button" class="group cursor-pointer" onclick={async () => await createNewChat()}>
			Please select a chat or
			<span class="hover:text-primary mx-1 underline">create a new one</span>
		</button>
	</div>
{:else}
	<div class="flex h-full w-full items-center justify-center text-center text-sm">
		<button type="button" class="group cursor-pointer" onclick={() => login()}>
			Please <span class="group-hover:text-primary mx-1 underline">login</span>
			to get started
		</button>
	</div>
{/if}
