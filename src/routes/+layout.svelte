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

<svelte:head>
	<title>zchat</title>
	<meta name="description" content="An AI chat app built with Zero by Rocicorp." />
	<meta property="og:title" content="zchat" />
	<meta property="og:description" content="An AI chat app built with Zero by Rocicorp." />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" /><meta
		property="og:image"
		content="https://zero.rocicorp.dev/opengraph-image.jpg?942633a931cbd1df"
	/>
	<meta name="twitter:card" content="summary_large_image" /><meta
		name="twitter:title"
		content="Zero Docs"
	/>
	<meta name="twitter:description" content="An AI chat app built with Zero by Rocicorp." />
	<meta name="twitter:image" content="https://zero.rocicorp.dev/opengraph-image.jpg" />
</svelte:head>

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
	{#if data.mode != 'ro'}
		<Sidebar />
	{/if}
	<Toaster />
</div>
