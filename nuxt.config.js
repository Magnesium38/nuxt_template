const build = require('./config/build.js');
const head = require('./config/head.js');

module.exports = {
	build: build,
	css: ['@/assets/scss/tailwind.scss'],
	head: head,
	loading: { color: '#8dc63f' },
}
