import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/kit/vite'

const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			precompress: true
		}),
		alias: {
			$lib: 'src/lib',
			$db: 'src/db',
			$routes: 'src/routes',
			$store: 'src/store',
			$util: 'src/util',
			$icon: 'src/media/icon',
			$img: 'src/media/image',
			$mail: 'src/mail',
			$api: 'src/routes/api'
		},
		csp: {
			directives: {
				'default-src': ['none'],
				'font-src': ['self'],
				'script-src': ['strict-dynamic'],
				'require-trusted-types-for': ['script'],
				'style-src': ['self', 'https://fonts.googleapis.com'],
				//'img-src': ['self', 'data:', 'https://gate.thepay.cz', 'https://upload.wikimedia.org'],
				'img-src': ['*', 'data:'],
				'frame-ancestors': ['self'],
				'base-uri': ['self'],
				'form-action': ['self'],
				'connect-src': ['self']
			}
		},
		version: {
			name: Date.now().toString(),
			pollInterval: 0
		}
	}
}

export default config
