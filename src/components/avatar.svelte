<script lang="ts">
	let {
		src,
		name
	}: {
		src?: string;
		name?: string;
	} = $props();

	function getUserInitials(name: string) {
		const names = name.split(' ');
		if (names.length === 1) {
			return names[0].charAt(0).toUpperCase();
		}
		return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
	}
</script>

{#if src}
	<div class="avatar">
		<div class="w-6 rounded-full">
			<img {src} alt="user" />
		</div>
	</div>
{:else}
	<div class="avatar avatar-placeholder">
		<div class="bg-neutral text-neutral-content w-6 rounded-full">
			<span class="text-md">{getUserInitials(name ?? 'Your Name')}</span>
		</div>
	</div>
{/if}
