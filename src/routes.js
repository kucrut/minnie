import Home from './pages/Home';
import Page from './pages/Page';
import Post from './pages/Post';
import Media from './pages/Media';

const pagedRoute = ( prefix = '' ) => ( {
	path: `${prefix}/page/:page(\\d+):ignored?`,
	component: Home,
} );

function createTermRoutes( taxonomies ) {
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

		const path = `/blog/${ route }/:${ slug }`;

		return current.concat( [
			pagedRoute( path ),
			{
				path,
				component: Home,
			},
		] );
	}, [] );
}

export default function createRoutes( taxonomies ) {
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
		createTermRoutes( taxonomies ),
		[
			{
				path: '/blog/:parentslug/:slug',
				component: Media,
			},
			{
				path: '/blog/:slug',
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
