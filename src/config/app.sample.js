module.exports = {
	port:   9090,
	apiUrl: 'http://minnie.dev',
	routes: {
		login:    '/login',
		page:     '/:slug',
		subPage:  '/:parentslug/:slug',
		post:     '/blog/:slug',
		media:    '/blog/:parentslug/:slug',
		preview:  '/preview/:type/:id',
		archives: {
			tag:      '/blog/tag/:tag',
			format:   '/blog/type/:format',
			category: '/blog/category/:category'
		}
	},
	taxonomyMap: {
		tag: {
			endpoint: 'tags',
			queryVar: 'tag'
		},
		format: {
			endpoint: 'formats',
			queryVar: 'post_format'
		},
		category: {
			endpoint: 'categories',
			queryVar: 'category_name'
		},
	},
	codeHighlight: {
		languages: [
			'bash', 'c', 'coffeescript', 'cpp', 'css', 'css-extras', 'http',
			'ini', 'java', 'javascript', 'json', 'jsx', 'less', 'makefile',
			'markdown', 'nginx', 'php', 'php-extras', 'ruby', 'sass', 'scss',
			'sql', 'yaml'
		]
	},
	gaId:                '' // Google Analytics ID, eg: UA-00000000-1,
	entryMetaTaxonomies: ['categories', 'tags', 'places']
};