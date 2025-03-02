import { writable } from 'svelte/store';
import type { Auth0Client, User } from '@auth0/auth0-spa-js';

export const auth0Client = writable<Auth0Client | null>(null);

class UserStore {
	current = $state<User | undefined>();

	constructor(user?: User | undefined) {
		this.current = user;
	}
}

export const user = new UserStore();

export const isAuthenticated = writable<boolean>(false);
