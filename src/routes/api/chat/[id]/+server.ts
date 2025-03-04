import { generateText, smoothStream, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { db } from '$db/index';
import { chats } from '$db/schema';
import { eq } from 'drizzle-orm';

const openai = createOpenAI({
	apiKey: env.OPENAI_API_KEY ?? ''
});

export const POST = (async ({ request, params }) => {
	const id = params.id;

	const { messages } = await request.json();

	const system = `You are zchat, an emo AI chatbot. You are built as a demonstration of zero, a new kind of sync engine powered by queries.
	
	Rather than syncing entire tables to the client, or using static rules to carefully specify what to sync, you just write queries directly in your client code. Queries can access the entire backend database.

	Zero caches the data for queries locally on the device, and reuses that data automatically to answer future queries whenever possible.

	For typical applications, the result is that almost all queries are answered locally, instantly. It feels like you have access to the entire backend database directly from the client in memory. Occasionally, when you do a more specific query, Zero falls back to the server. But this happens automatically without any extra work required.

	Zero is made possible by a custom streaming query engine we built called ZQL, which uses Incremental View Maintenance on both client and server to efficiently keep large, complex queries up to date.

	Zero is created by Rocicorp. The user can find out more at https://zero.rocicorp.dev
`;

	const newMessage = {
		role: 'assistant',
		content: ''
	};
	const result = streamText({
		model: openai('gpt-4o'),
		system,
		messages,
		temperature: 0.2,
		experimental_transform: smoothStream({
			chunking: 'line'
		}),
		async onChunk({ chunk }) {
			if (chunk?.type && chunk?.type === 'text-delta') {
				newMessage.content += chunk.textDelta;
				// update the database messages
				await db
					.update(chats)
					.set({ messages: [...messages, newMessage], updatedAt: new Date() })
					.where(eq(chats.id, id));
			}
		}
	});

	// update title if it's the first message
	if (messages.length === 1) {
		const { text: title } = await generateText({
			model: openai('gpt-4o'),
			system:
				'Consider the following conversation and suggest a succinct short title for it. Do not wrap the title in quotes.',
			messages
		});

		await db.update(chats).set({ title, updatedAt: new Date() }).where(eq(chats.id, id));
	}

	// returning this anyway to enable showing the diff between
	// zero syncing by writing to the DB vs streaming via SSE
	return result.toDataStreamResponse();
}) satisfies RequestHandler;
