<script lang="ts">
	import Prompt from '$components/prompt.svelte';
	import Header from '$components/header.svelte';
	import Icon from '$components/icon.svelte';
	import toast from 'svelte-french-toast';
	import { z } from '$lib/z.svelte';
	import { goto } from '$app/navigation';
	import { Query } from 'zero-svelte';
	import Logo from '$components/logo.svelte';

	let { data, children } = $props();

	let chats = new Query(z.current.query.chats);
	let selectedChat = $derived(chats.current.find((chat) => chat.id === data?.id));

	const url = new URL(window.location.href);
	url.searchParams.set('mode', 'ro');
</script>

<Header>
	{#if data?.mode === 'ro'}
		<div class="flex w-full flex-row items-center justify-between p-4">
			<Logo />
			<p class="text-xs whitespace-nowrap opacity-60">Read-only</p>
		</div>
	{:else}
		<div class="flex flex-row pr-4">
			<button
				class="btn btn-xs"
				title="Copy link to clipboard"
				onclick={() => {
					navigator.clipboard.writeText(url.toString());
					toast.success('Link copied to clipboard!');
				}}
			>
				<Icon size="size-5" name="copy-link" />
			</button>
			<button
				class="btn btn-xs"
				title="Share ready-only link"
				onclick={() => window.open(url.toString())}
			>
				<Icon size="size-5" name="share" />
			</button>
			<button
				class="btn btn-xs"
				title="Share ready-only link"
				onclick={async () => {
					// get confirmation
					if (confirm('Are you sure you want to delete this chat?')) {
						z.current.mutate.chats.delete({ id: data?.id });
						toast.success('Chat deleted!');
						goto('/');
					}
				}}
			>
				<Icon size="size-5 hover:text-red-500" name="trash" />
			</button>
		</div>
		<label for="app-drawer" class="drawer-btn lg:hidden"><Icon name="menu" /></label>
	{/if}
</Header>
{@render children()}
{#if data.mode !== 'ro'}
	<Prompt chatId={data?.id} messages={selectedChat?.messages ?? []} />
{/if}
