import { PUBLIC_SERVER } from '$env/static/public';
import { Z } from 'zero-svelte';
import { schema, type Schema } from '../db/zSchema';

export function get_z_options(userID?: string, token?: string) {
	const options = {
		userID: userID ?? 'anon',
		server: PUBLIC_SERVER,
		auth: token ?? undefined,
		schema
	} as const;

	return options;
}

export const z = new Z<Schema>(get_z_options());
