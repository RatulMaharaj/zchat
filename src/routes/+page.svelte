<script lang="ts">
	import { isAuthenticated, login } from '$lib/auth.svelte';
	import Header from '$components/header.svelte';
	import { createNewChat } from '$lib/helpers.svelte';
	import Icon from '$components/icon.svelte';
</script>

<Header >
	<label for="app-drawer" class="drawer-btn lg:hidden"><Icon name="menu" /></label>
</Header>

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
