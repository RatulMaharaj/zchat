<script lang="ts">
	import Logo from '$components/logo.svelte';
	import { isAuthenticated, user } from '$lib/store.svelte';
	import Profile from '../profile.svelte';
	import ChatHistory from './chats.svelte';
	import NewChat from './new.svelte';
	let filter = $state('');
</script>

<nav class="drawer-side z-20">
	<label for="app-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
	<ul class="menu bg-base-100 text-base-content relative z-10 min-h-full w-60 p-4">
		<Logo />
		<br />
		<NewChat />
		{#if user.current?.sub}
			<ChatHistory bind:filter userId={user.current?.sub} />
		{:else if $isAuthenticated}
			<div class="flex w-full flex-col gap-y-2">
				{#each Array(3), i (i)}
					<div class="skeleton h-8 w-full"></div>
				{/each}
			</div>
		{/if}
		<span class="divider"></span>
		<Profile />
	</ul>
</nav>
