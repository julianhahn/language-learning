import nano from 'nano';
// docu on the generated types https://kit.svelte.dev/docs/types#generated-types
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	// read here why we don't return in finally:
	// https://eslint.org/docs/latest/rules/no-unsafe-finally
	try {
		console.log('hallo von dem backend');
		const nano_instance = nano('http://admin:marvinpw!@db.jul-mar.de');

		/* 		const alice = await nano_instance.use('alice4');
		const id = await alice.attachment.getAsStream(
			'2ca49cda-77ed-4fed-a85c-2637f0106b78',
			'2ca49cda-77ed-4fed-a85c-2637f0106b78.png'
		); */

		return { stream: 'tbc' };
	} catch (error: any) {
		console.log('\x1b[31m', 'run into an error while server load');
		console.log('\x1b[31m', error?.description);
		return { message: 'no connection possible' };
	}
}) satisfies PageServerLoad;
