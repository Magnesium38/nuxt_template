const path = require('path');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');

class TailwindExtractor {
	static extract(content) {
		return content.match(/[A-z0-9-:/]+/g) || []
	}
}

module.exports = {
	/*
	** Headers of the page
	*/
	head: {
		title: 'proposal',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Nuxt.js project' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	/*
	** Customize the progress bar color
	*/
	loading: { color: '#8dc63f' },

	css: ['@/assets/scss/tailwind.scss'],

	/*
	** Build configuration
	*/
	build: {
		extractCSS: true,
		
		postcss: [
			require('tailwindcss')('./tailwind.js'),
			require('autoprefixer'),
		],
		
		/*
		** Run ESLint on save
		*/
		extend (config, { isDev, isClient }) {
			if (!isDev) {
				config.plugins.push(
					new PurgecssPlugin({
						paths: glob.sync([
							path.join(__dirname, './pages/**/*.vue'),
							path.join(__dirname, './layouts/**/*.vue'),
							path.join(__dirname, './components/**/*.vue'),
						]),

						extractors: [{
							extractor: TailwindExtractor,
							extensions: ['vue'],
						}],

						whitelist: [
							'html',
							'body',
							'nuxt-progress',
						],
					}),
				);
			}

			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
		}
	}
}
