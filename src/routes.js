import Home from './pages/Home';
import Page from './pages/Page';
import Post from './pages/Post';
import Media from './pages/Media';

const pagedRoute = ( prefix = '' ) => ( {
	path: `${prefix}/page/:page(\\d+):ignored?`,
	component: Home,
} );

function createTermRoutes( taxonomies, blogPrefix ) {
	return taxonomies.reduce( ( current, tax ) => {
		const { slug, types } = tax;

		if ( ! types.includes( 'post' ) ) {
			return current;
		}

		let route;

		switch ( slug ) {
			case 'category':
				route = slug;
				break;

			case 'post_tag':
				route = 'tag';
				break;

			case 'post_format':
				route = 'type';
				break;
			default:
				route = slug;
		}

		const path = `${ blogPrefix }/${ route }/:${ slug }`;

		return current.concat( [
			pagedRoute( path ),
			{
				path,
				component: Home,
			},
		] );
	}, [] );
}

export default function createRoutes( taxonomies, blogPrefix ) {
	return [].concat(
		[
			{
				path: '/',
				exact: true,
				component: Home,
			},
			/* TODO
			{
				path: '/login',
				component: Login,
			},
			*/
			/* TODO
			{
				path: '/preview/:type/:id',
				component: Preview,
			},
			*/
		],
		createTermRoutes( taxonomies, blogPrefix ),
		[
			{
				path: `${ blogPrefix }/:parentslug/:slug`,
				component: Media,
			},
			{
				path: `${ blogPrefix }/:slug`,
				component: Post,
			},
			pagedRoute(),
			{
				path: '/:parentslug/:slug',
				component: Page,
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
				component: Home,
			},
		],
	);
}
