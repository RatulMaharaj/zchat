<script lang="ts">
	let { children, data } = $props();

	import { onMount } from 'svelte';
	import { initAuth, isAuthenticated } from '$lib/auth.svelte';
	import Sidebar from '../components/sidebar/index.svelte';
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';

	onMount(async () => {
		if (!$isAuthenticated) {
			await initAuth();
		}
	});
</script>

<div class="drawer lg:drawer-open">
	{#if data.mode != 'ro'}
		<input id="app-drawer" type="checkbox" class="drawer-toggle" />
	{/if}
	<main class="drawer-content flex h-screen max-h-screen flex-col items-center justify-start">
		<section
			id="content"
			class="relative h-full w-full flex-col items-start justify-start overflow-y-scroll"
		>
			{@render children()}
		</section>
	</main>
	{#if data.mode !== 'ro'}
		<Sidebar />
	{/if}
	<Toaster />
</div>
