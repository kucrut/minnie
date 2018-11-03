import qs from 'qs';
import axios from 'axios';
import { forEach, has, size, trim } from 'lodash';

import { taxonomyMap } from './config/app';

export const contentPathRegEx = new RegExp( '^/wp-content/' );

export function canUseDOM() {
	return !! (
		( typeof window !== 'undefined' && window.document && window.document.createElement )
	);
}

export function getToken() {
	const token = canUseDOM ? localStorage.getItem( 'minnieToken' ) : '';

	return token;
}

export function configureAxios( apiUrl ) {
	axios.defaults.baseURL = `${trim( apiUrl, '/' )}/wp-json/`;
	axios.defaults.headers = { 'X-Requested-With': 'minnie' };
	axios.defaults.paramsSerializer = params => qs.stringify( params, { arrayFormat: 'brackets' } );
}

export function normalizeParams( params ) {
	const taxNames = Object.keys( taxonomyMap );
	let filter = {};
	let normalized = {};

	Object.keys( params ).forEach( key => {
		// This is to avoid useless params such as { '0': '/' }.
		if ( ! isNaN( key ) ) {
			return;
		}

		switch ( key ) {
			case 'page': {
				const value = Number( params[ key ] );
				if ( value > 1 ) {
					normalized = {
						...normalized,
						page: value,
					};
				}
			}
				break;

			case 's': {
				const value = params[ key ].trim();
				if ( value ) {
					normalized = {
						...normalized,
						search: value,
					};
				}
			}
				break;

			default: {
				const value = params[ key ];

				if ( taxNames.includes( key ) ) {
					const { queryVar } = taxonomyMap[ key ];
					filter = {
						...filter,
						[ queryVar ]: key === 'format'
							? `post-format-${ value }`
							: value,
					};
				} else {
					normalized = {
						...normalized,
						[ key ]: value,
					};
				}
			}
		}
	} );

	if ( Object.keys( filter ).length ) {
		normalized = {
			...normalized,
			filter,
		};
	}

	return normalized;
}

export function getArchiveTaxonomyTerm( params ) {
	let result = null;

	if ( size( params ) < 1 ) {
		return result;
	}

	for ( const routeParam of Object.keys( taxonomyMap ) ) {
		if ( ! has( params, routeParam ) ) {
			continue;
		}

		const props = taxonomyMap[ routeParam ];
		let slug = params[ routeParam ];

		if ( routeParam === 'format' ) {
			slug = `post-format-${slug}`;
		}

		result = {
			endpoint: props.endpoint,
			slug,
		};
	}

	return result;
}

// TODO: Seriously, refactor this!
export function getAdjacentLink( next = true, args ) {
	const { hasMore, currentPage, path, params, query } = args;

	function addSearchQuery( link ) {
		if ( has( query, 's' ) ) {
			return `${link}?s=${query.s}`;
		}

		return link;
	}

	const newPage = next ? currentPage - 1 : currentPage + 1;
	let link = '';
	let paths = [];
	let newParams = { page: newPage };

	// Home's prev
	if ( hasMore && path === '/' && ! next ) {
		return addSearchQuery( '/page/2' );
	} else if ( newPage === 0 || ( ! hasMore && ! next ) ) {
		return link;
	}

	paths = [ path ];

	// TODO: ??? :D
	/*
	if ( route.childRoutes ) {
		forEach( route.childRoutes, el => {
			if ( el.path ) {
				paths.push( el.path );
			}
		} );
	}
	*/

	link = paths.join( '/' );

	newParams = {
		...params,
		...newParams,
	};

	forEach( newParams, ( value, key ) => {
		link = link.replace( `:${key}`, value );
	} );

	link = link.replace( 'page/1', '' );
	link = trim( link, '/' );
	link = `/${link}`;

	return addSearchQuery( link );
}

/**
 *  Wait for something :)
 *
 *  Promise-based setTimeout() as seen in
 *  http://stackoverflow.com/a/32543590/3313333
 *
 *  @param  {number}  interval Wait interval (ms)
 *  @return {Promise}
 */
export function wait( interval ) {
	return new Promise( resolve => setTimeout( resolve, interval ) );
}

/**
 *  Check other state
 *
 *  @param  {func}    getState From redux.
 *  @param  {string}  State name.
 *  @param  {number}  Check interval (ms).
 *  @return {Promise}
 */
export function checkOtherState( getState, name, interval = 100 ) {
	const store = getState();

	if ( ! store.hasOwnProperty( name ) ) {
		return Promise.reject( `"${name}" could not be found in store.` );
	}

	if ( store[ name ].isFetching ) {
		return wait( interval ).then( () => checkOtherState( getState, name, interval ) );
	}

	return Promise.resolve( store[ name ] );
}

export function getQueryVar( name, url ) {
	const qvar = name.replace( /[[]]/g, '\\$&' );
	const regex = new RegExp( `[?&]${qvar}(=([^&#]*)|&|#|$)` );
	const results = regex.exec( url );

	if ( ! results ) {
		return null;
	}

	if ( ! results[ 2 ] ) {
		return '';
	}

	return decodeURIComponent( results[ 2 ].replace( /\+/g, ' ' ) );
}

export function hashCode( str ) {
	return str.split( '' ).reduce( ( prevHash, currVal ) =>
		( ( prevHash << 5 ) - prevHash ) + currVal.charCodeAt( 0 ), 0 );
}
