<script lang="ts">
	import { isAuthenticated } from '$lib/auth.svelte';
</script>

{#if $isAuthenticated}
	<div class="flex h-full w-full items-center justify-center text-center text-sm">
		Please select a chat or create a new one.
	</div>
{:else}
	<div class="flex h-full w-full items-center justify-center text-center text-sm">
		Please login to get started
	</div>
{/if}
