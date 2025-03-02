import {
	PUBLIC_AUTH0_DOMAIN,
	PUBLIC_AUTH0_CLIENT_ID,
	PUBLIC_AUTH0_CALLBACK_URL
} from '$env/static/public';
import { createAuth0Client } from '@auth0/auth0-spa-js';
import { get } from 'svelte/store';
import { user, auth0Client, isAuthenticated } from './store.svelte';
import { get_z_options, z } from '$lib/z.svelte';

async function initAuth() {
	const client = await createAuth0Client({
		domain: PUBLIC_AUTH0_DOMAIN,
		clientId: PUBLIC_AUTH0_CLIENT_ID,
		authorizationParams: {
			redirect_uri: PUBLIC_AUTH0_CALLBACK_URL
		}
	});

	try {
		// throws for various reasons
		console.log('handling redirect callback...');
		const res = await client.handleRedirectCallback();
		console.log('redirect callback handled', res);
	} catch (error) {
		console.error('Auth0 error handling redirect callback', error);
	}

	// update client in store
	auth0Client.set(client);

	// update isAuthenticated store
	const isLoggedIn = await client.isAuthenticated();
	isAuthenticated.set(isLoggedIn);

	// get user data
	const userData = await client.getUser();

	if (userData?.sub) {
		// update user store
		user.current = userData;

		// upsert user in db
		z.current.mutate.users.upsert({
			id: userData?.sub,
			email: userData?.email,
			name: userData?.name,
			picture: userData?.picture,
			emailVerified: userData?.email_verified ?? false
		});

		const claims = await client.getIdTokenClaims();
		const z_options = get_z_options(claims?.sub, claims?.__raw);
		z.build(z_options);
		console.log('z rebuilt');
	}
}

async function login() {
	const client = get(auth0Client);
	if (client) {
		client.loginWithRedirect({
			authorizationParams: {
				redirect_uri: window.location.href
			}
		});
	}
}

async function logout() {
	const client = get(auth0Client);
	if (client) {
		client.logout({ logoutParams: { returnTo: window.location.origin } });
		isAuthenticated.set(false);
		user.current = undefined;
		z.close();
	}
}

export { initAuth, user, isAuthenticated, auth0Client, login, logout };
