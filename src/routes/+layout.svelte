<script lang="ts">
	let { children } = $props();

	import { onMount } from 'svelte';
	import { initAuth, isAuthenticated } from '$lib/auth.svelte';
	import Header from '../components/header.svelte';
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
</svelte:head>

<div class="drawer lg:drawer-open">
	<input id="app-drawer" type="checkbox" class="drawer-toggle" />
	<main class="drawer-content flex h-screen max-h-screen flex-col items-center justify-start">
		<Header />
		<section
			id="content"
			class="relative h-full w-full flex-col items-start justify-start overflow-y-scroll"
		>
			{@render children()}
		</section>
	</main>
	<Sidebar />
	<Toaster />
</div>
