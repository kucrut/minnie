import Login from './pages/Login';
import Index from './pages/Index';
import Page from './pages/Page';
import Post from './pages/Post';
import Media from './pages/Media';
import Preview from './pages/Preview';

export default [].concat(
	[
		{
			path: '/login',
			component: Login,
		},
		{
			path: '/page/:page',
			component: Index,
		},
		{
			path: '/:parentslug/:slug',
			component: Page,
		},
		{
			path: '/blog/:slug',
			component: Post,
		},
		{
			path: '/blog/:parentslug/:slug',
			component: Media,
		},
		{
			path: '/preview/:type/:id',
			component: Preview,
		},
		{
			path: '/:slug([^\\?]+)',
			component: Page,
		},
	],
	// TODO: Add more routes (archive, paged).
	[
		{
			path: '*',
			component: Index,
		},
	],
);
