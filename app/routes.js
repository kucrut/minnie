import Login from './pages/Login';
import Index from './pages/Index';
import Page from './pages/Page';
import Post from './pages/Post';
import Media from './pages/Media';
import NotFound from './pages/404';
import Preview from './pages/Preview';

export default [].concat(
	[
		{
			path: '/',
			exact: true,
			component: Index,
		},
		{
			path: '/login',
			exact: true,
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
	],
	// TODO: Add more routes (archive, paged).
	[
		{
			path: '*',
			component: NotFound,
		},
	],
);
