import type { PageLoad } from './$types';

// this will only run client side because of the +layout.server.ts
export const load: PageLoad = ({ params }) => {
	return {
		id: params.id
	};
};
