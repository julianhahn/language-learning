import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		host: true,
		port: 3000
	}
};

export default config;
