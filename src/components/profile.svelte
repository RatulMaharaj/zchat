<script lang="ts">
	import { isAuthenticated, login, logout, user } from '$lib/auth.svelte';
	import Avatar from './avatar.svelte';
	import Icon from './icon.svelte';
</script>

<div class="absolute right-4 bottom-2 left-4 my-2 flex items-center justify-start gap-2 py-1">
	{#if $isAuthenticated}
		<Avatar name={user.current?.name} src={user.current?.picture} />
		<p title={user.current?.name} class="w-full overflow-hidden text-left text-sm text-ellipsis">
			{user.current?.name}
		</p>
		<button
			type="button"
			onclick={() => logout()}
			class="flex h-full w-10 flex-row items-center justify-end"><Icon name="signOut" /></button
		>
	{:else}
		<button
			type="button"
			class="btn btn-secondary btn-outline w-full"
			onclick={async () => {
				await login();
			}}>Login</button
		>
	{/if}
</div>
