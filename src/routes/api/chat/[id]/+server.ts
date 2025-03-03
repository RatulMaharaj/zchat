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

	console.log(messages);

	const newMessage = {
		role: 'assistant',
		content: ''
	};
	const result = streamText({
		model: openai('gpt-4o'),
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
			system: 'Consider the following conversation and suggest a succinct short title for it.',
			messages
		});

		await db.update(chats).set({ title, updatedAt: new Date() }).where(eq(chats.id, id));
	}

	// returning this anyway to enable showing the diff between
	// zero syncing by writing to the DB vs streaming via SSE
	return result.toDataStreamResponse();
}) satisfies RequestHandler;
