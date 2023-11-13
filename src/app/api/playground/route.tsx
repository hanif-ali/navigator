/** @jsxImportSource ai-jsx */
import { toStreamResponse } from 'ai-jsx/stream';

import {ChatCompletion, UserMessage} from 'ai-jsx/core/completion'


export async function POST(req: Request) {
	const { topic } = await req.json();

  return toStreamResponse(
		<ChatCompletion>
			<UserMessage>Write a 5 word sentence about {topic}.</UserMessage>
		</ChatCompletion>
	)
}