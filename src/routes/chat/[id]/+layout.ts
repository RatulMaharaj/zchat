import type { LayoutLoad } from './$types';

// this will only run client side because of the +layout.server.ts
export const load: LayoutLoad = ({ params }) => {
	return {
		id: params.id
	};
};
