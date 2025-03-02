<script lang="ts">
	let { name, size = 'size-4' }: { name: string; size?: string } = $props();
</script>

{#if name == 'signOut'}
	<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" class={size}
		><path
			d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"
		></path></svg
	>
{/if}

{#if name == 'menu'}
	<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class={size} viewBox="0 0 256 256"
		><path
			d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"
		></path></svg
	>
{/if}

{#if name == 'send'}
	<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" class={size}
		><path
			d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"
		></path></svg
	>
{/if}
