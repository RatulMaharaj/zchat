import { createZeroSchema } from 'drizzle-zero';
import { ANYONE_CAN, definePermissions, type ExpressionBuilder } from '@rocicorp/zero';
import * as drizzleSchema from './schema';

// Convert to Zero schema
export const schema = createZeroSchema(drizzleSchema, {
	// The version of the schema passed to Zero.
	version: 1,

	// Specify which tables and columns to include in the Zero schema.
	// This allows for the "expand/migrate/contract" pattern recommended in the Zero docs.
	// When a column is first added, it should be set to false, and then changed to true
	// once the migration has been run.

	// All tables/columns must be defined, but can be set to false to exclude them from the Zero schema.
	// Column names match your Drizzle schema definitions
	tables: {
		users: {
			id: true,
			email: true,
			name: true,
			picture: true,
			emailVerified: true,
			createdAt: true,
			updatedAt: true
		},
		chats: {
			id: true,
			title: true,
			messages: true,
			userId: true,
			createdAt: true,
			updatedAt: true
		}
	}
});

// Define permissions with the inferred types from Drizzle
export type Schema = typeof schema;

// The decoded value of your JWT.
type AuthData = {
	// The logged-in user.
	sub: string;
};

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
	const allowIfChatCreator = (authData: AuthData, { cmp }: ExpressionBuilder<Schema, 'chats'>) =>
		cmp('userId', '=', authData.sub);

	return {
		users: {
			row: {
				insert: ANYONE_CAN,
				select: ANYONE_CAN,
				delete: ANYONE_CAN,
				update: {
					postMutation: ANYONE_CAN,
					preMutation: ANYONE_CAN
				}
			}
		},
		chats: {
			row: {
				insert: [allowIfChatCreator],
				select: ANYONE_CAN,
				update: {
					postMutation: [allowIfChatCreator],
					preMutation: [allowIfChatCreator]
				},
				delete: [allowIfChatCreator]
			}
		}
	};
});
