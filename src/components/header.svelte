<script lang="ts">
	import Icon from './icon.svelte';
</script>

<div id="header" class="flex h-12 w-full flex-row items-center justify-end gap-2 px-4 py-2">
	<slot />
	<label for="app-drawer" class="drawer-btn lg:hidden"><Icon name="menu" /></label>
</div>
