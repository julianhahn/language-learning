import nano from 'nano';
// docu on the generated types https://kit.svelte.dev/docs/types#generated-types
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	// read here why we don't return in finally:
	// https://eslint.org/docs/latest/rules/no-unsafe-finally
	try {
		console.log('hallo von dem backend');
		const nano_instance = nano('http://admin:marvinpw!@127.0.0.1:5984');

		await nano_instance.db.create('alice', { n: 3 });
		const info = await nano_instance.db.get('alice');

		return { key: info };
	} catch (error: any) {
		console.log("\x1b[31m", 'run into an error while server load');
		console.log("\x1b[31m", error?.description);
		return { message: 'no connection possible' };
	}
}) satisfies PageServerLoad;
