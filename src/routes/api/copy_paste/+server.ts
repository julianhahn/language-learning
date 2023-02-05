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

		fs.promises.writeFile('../couchdb/files/' + uuid + '.png', lgg, 'base64').then(()=>{
		
		fs.promises.readFile('../couchdb/files/' + uuid + '.png').then(async (data)=>{
			await alice.attachment.insert(uuid, uuid + '.png', data, 'image/png')
		})})
		
	} catch (error: any) {
		console.log('\x1b[31m', 'could not post', error);
		console.log('\x1b[31m', error?.description);
		return json({ message: 'could not post' });
	}

	return json(id);
}) satisfies RequestHandler;
