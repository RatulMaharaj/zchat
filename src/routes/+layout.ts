import type { LayoutLoad } from './$types';

// this will only run client side because of the +layout.server.ts
export const load: LayoutLoad = ({ url }) => {
	const searchParams = url.searchParams;

	const mode: 'rw' | 'ro' = searchParams.get('mode') === 'ro' ? 'ro' : 'rw';

	return {
		mode
	};
};
