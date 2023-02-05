import { json } from '@sveltejs/kit';
import nano from 'nano';
import type { RequestHandler } from './$types';
import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer';
import fs from 'fs';

export const POST = (async ({ request }) => {
	let id;
	try {
		const nano_instance = nano('http://admin:marvinpw!@db.jul-mar.de');

		const alice = await nano_instance.use('alice4');
		const uuid = uuidv4();
		console.log(uuid);

		const lgg = (await request.json()) as string;

		fs.writeFile('../' + uuid + '.png', lgg, 'base64', function (err) {
			console.log(err);
		});
		fs.readFile('../' + uuid + '.png', async (err, data) => {
			if (!err) {
				await alice.attachment.insert(uuid, uuid + '.png', data, 'image/png');
			}
		});

		id = await alice.attachment.get(uuid, uuid + '.png');
	} catch (error: any) {
		console.log('\x1b[31m', 'could not post', error);
		console.log('\x1b[31m', error?.description);
		return json({ message: 'could not post' });
	}

	return json(id);
}) satisfies RequestHandler;
