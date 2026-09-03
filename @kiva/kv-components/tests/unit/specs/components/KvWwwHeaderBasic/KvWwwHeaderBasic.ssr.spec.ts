/**
 * @jest-environment node
 */
import { createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer'; // eslint-disable-line import/no-extraneous-dependencies
import KvWwwHeaderBasic from '#components/KvWwwHeaderBasic/KvWwwHeaderBasic.vue';

describe('KvWwwHeaderBasic server markup', () => {
	it('carries no pointer type, so the hover-open styles stay inert until the client mounts', async () => {
		const app = createSSRApp({ render: () => h(KvWwwHeaderBasic, { loggedIn: false }) });
		app.provide('$kvTrackEvent', () => {});
		const html = await renderToString(app);
		expect(html).not.toContain('data-pointer');
	});
});
