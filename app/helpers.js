import qs from 'qs';
import axios from 'axios';
import { forEach, has, isEmpty, omit, size, trim } from 'lodash';
import { taxonomyMap } from 'constants/index';


export const contentPathRegEx = new RegExp( '^/wp-content/' );

export function canUseDOM() {
	return !!(
		( 'undefined' !== typeof window && window.document && window.document.createElement )
	);
}

export function getToken() {
	const token = canUseDOM ? localStorage.getItem( 'minnieToken' ) : '';

	return token;
}

export function configureAxios( apiUrl ) {
	axios.defaults.baseURL = `${trim( apiUrl, '/' )}/wp-json/`;
	axios.defaults.headers = { 'X-Requested-With': 'minnie' };
	axios.defaults.paramsSerializer = params => qs.stringify( params, {
		arrayFormat: 'brackets'
	});
}

export function normalizeParams( params ) {
	let filters = {};
	let normalized = Object.assign({}, params, {
		page: parseInt( ( params.page || 1 ), 10 )
	});


	// Convert `s` to `search`.
	if ( has( normalized, 's' ) ) {
		normalized = Object.assign({}, omit( normalized, 's' ), {
			search: normalized.s
		});
	}

	// Build `filter` param.
	for ( const routeParam of Object.keys( taxonomyMap ) ) {
		if ( ! has( normalized, routeParam ) ) {
			continue;
		}

		const props = taxonomyMap[ routeParam ];
		let term = params[ routeParam ];

		if ( 'format' === routeParam ) {
			term = `post-format-${term}`;
		}

		filters = Object.assign({}, filters, {
			[ props.queryVar ]: term
		});

		normalized = Object.assign({}, omit( normalized, routeParam ) );
	}

	if ( ! isEmpty( filters ) ) {
		normalized = Object.assign({}, normalized, {
			filter: filters
		});
	}

	return normalized;
}

export function getArchiveTaxonomyTerm( params ) {
	let result = null;

	if ( 1 > size( params ) ) {
		return result;
	}

	for ( const routeParam of Object.keys( taxonomyMap ) ) {
		if ( ! has( params, routeParam ) ) {
			continue;
		}

		const props = taxonomyMap[ routeParam ];
		let slug = params[ routeParam ];

		if ( 'format' === routeParam ) {
			slug = `post-format-${slug}`;
		}

		result = {
			endpoint: props.endpoint,
			slug
		};
	}

	return result;
}

export function getAdjacentLink( next = true, args ) {
	const { hasMore, currentPage, route, routeParams, query } = args;

	function addSearchQuery( link ) {
		if ( has( query, 's' ) ) {
			return `${link}?s=${query.s}`;
		}

		return link;
	}

	const newPage = next ? currentPage - 1 : currentPage + 1;
	let link      = '';
	let paths     = [];
	let newParams = { page: newPage };

	// Home's prev
	if ( hasMore && ! route.path && ! next ) {
		return addSearchQuery( '/page/2' );
	} else if ( 0 === newPage || ( ! hasMore && ! next ) ) {
		return link;
	}

	paths = [route.path];

	if ( route.childRoutes ) {
		forEach( route.childRoutes, el => {
			if ( el.path ) {
				paths.push( el.path );
			}
		});
	}

	link = paths.join( '/' );

	newParams = Object.assign({}, routeParams, newParams );
	forEach( newParams, ( value, key ) => {
		link = link.replace( `:${key}`, value );
	});

	link = link.replace( 'page/1', '' );
	link = trim( link, '/' );
	link = `/${link}`;

	return addSearchQuery( link );
}
