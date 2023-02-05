import { json } from '@sveltejs/kit';
import nano from 'nano';
import type { RequestHandler } from './$types';
import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer';

export const POST = (async ({ request }) => {
	let id;
	try {
		const nano_instance = nano('http://admin:marvinpw!@db.jul-mar.de');

		const alice = await nano_instance.use('alice4');
		const uuid = uuidv4();
		const lgg = (await request.json()) as string;

		const buf = Buffer.from(lgg, 'base64');
		const attachment = {
			buffer: buf,
			content_type: 'image/png'
		};
		await alice.attachment.insert(uuid, uuid + '.png', attachment, 'image/png');
		id = await alice.attachment.get(uuid, uuid + '.png');
		console.log(id);
	} catch (error: any) {
		console.log('\x1b[31m', 'could not post', error);
		console.log('\x1b[31m', error?.description);
		return json({ message: 'could not post' });
	}

	return json(id);
}) satisfies RequestHandler;
