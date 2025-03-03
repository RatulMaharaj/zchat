import { isAuthenticated } from '$lib/store.svelte';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';

// this will only run client side because of the +layout.server.ts
export const load: LayoutLoad = ({ params, url }) => {
	// get the mode query param
	const mode = url.searchParams.get('mode') ?? 'rw';
	// redirect if not authenticated and not in read-only mode
	if (mode !== 'ro' && !get(isAuthenticated)) {
		throw redirect(302, '/');
	}
	return {
		id: params.id
	};
};
