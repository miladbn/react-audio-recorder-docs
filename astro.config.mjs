// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'react-audio-recorder-hook',
			social: {
				github: 'https://github.com/miladbn/react-audio-recorder-hook',
			},
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: '' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Basic Usage', slug: 'getting-started/basic-usage' },
					],
				},
				{
					label: 'API Reference',
					items: [
						{ label: 'Hook Overview', slug: 'api/hook-overview' },
						{ label: 'Return Values', slug: 'api/return-values' },
						{ label: 'Status Values', slug: 'api/status-values' },
					],
				},
				{
					label: 'Examples',
					items: [
						{ label: 'Basic Example', slug: 'examples/basic' },
						{ label: 'Status Handling', slug: 'examples/status-handling' },
					],
				},
			],
		}),
	],
});
