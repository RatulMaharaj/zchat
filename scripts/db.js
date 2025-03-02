import { execSync } from 'child_process';
import { configDotenv } from 'dotenv';

// Load environment variables from .env file.
configDotenv();

// Ensure the ZERO_UPSTREAM_DB environment variable is set.
if (!process.env.DATABASE_URL) {
	console.error('Error: DATABASE_URL environment variable is not set.');
	process.exit(1);
}

// Connect to the server using DATABASE_URL and create a new database.
const dbs = ['zchat', 'zchat_cvr', 'zchat_cdb'];
dbs.map((db) => {
	try {
		execSync(`psql "${process.env.DATABASE_URL}" -c "CREATE DATABASE ${db};"`, {
			stdio: 'inherit'
		});
		console.log(`Database '${db}' created successfully.`);
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error creating database:', error.message);
		}
	}
});

process.exit(1);
