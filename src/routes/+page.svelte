<script lang="ts">
	import { isAuthenticated, login } from '$lib/auth.svelte';
	import Header from '$components/header.svelte';
</script>

<Header />

{#if $isAuthenticated}
	<div class="flex h-full w-full items-center justify-center text-center text-sm">
		Please select a chat or create a new one.
	</div>
{:else}
	<div class="flex h-full w-full items-center justify-center text-center text-sm">
		<button type="button" class="group cursor-pointer" onclick={() => login()}>
			Please <span class="group-hover:text-primary mx-1 underline">login</span>
			to get started
		</button>
	</div>
{/if}
