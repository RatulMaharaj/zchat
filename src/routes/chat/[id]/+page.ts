import type { PageLoad } from './$types';

// this will only run client side because of the +layout.server.ts
export const load: PageLoad = ({ params }) => {
	console.log('running the load function');
	return {
		id: params.id
	};
};
