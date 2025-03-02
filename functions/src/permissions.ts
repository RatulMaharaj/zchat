import { execSync } from 'node:child_process';

export function handler() {
	execSync('npx zero-deploy-permissions', { stdio: 'inherit' });
}
