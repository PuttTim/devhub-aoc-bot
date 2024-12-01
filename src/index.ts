/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	BOT_TOKEN: string;
	CHAT_ID: string;
	TEST_CHAT_ID: string;
}

import messages from './messages.json';

export default {
	async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {
		const date = new Date().getDate().toString() as keyof typeof messages;

		// new fetch POST request
		const response = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chat_id: env.CHAT_ID,
				text: messages[date] + '\n\n' + `https://adventofcode.com/2024/day/${date}`,
			}),
		});

		// log response
		console.log(await response.json());
	},
} satisfies ExportedHandler<Env>;
