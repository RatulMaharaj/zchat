import { relations, sql } from 'drizzle-orm';
import { pgTable, text, jsonb, timestamp, boolean } from 'drizzle-orm/pg-core';
import { type UIMessage } from 'ai';

const timestamps = {
	createdAt: timestamp('created_at', {
		mode: 'date',
		precision: 3
	})
		.default(sql`now()`)
		.notNull(),
	// TODO: Fix this
	updatedAt: timestamp('updated_at', {
		mode: 'date',
		precision: 3
	}).$onUpdate(() => sql`now()`)
};

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	email: text('email'),
	name: text('name'),
	picture: text('picture'),
	emailVerified: boolean('email_verified'),
	...timestamps
});

export const usersRelations = relations(users, ({ many }) => ({
	docs: many(chats)
}));

export const chats = pgTable('chats', {
	id: text('id').primaryKey(),
	title: text('title').notNull().default('New Chat'),
	messages: jsonb('messages').$type<UIMessage[]>().notNull(),
	userId: text('author_id')
		.references(() => users.id)
		.notNull(),
	...timestamps
});

export const chatsRelations = relations(chats, ({ one }) => ({
	author: one(users, {
		fields: [chats.userId],
		references: [users.id]
	})
}));
