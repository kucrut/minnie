import axios from 'axios';
import { trim } from 'lodash';
import { stringify } from 'qs';

function oops( error ) {
	const message = error.response
		? `${ error.request.path } ${ JSON.stringify( error.response.data ) }`
		: error.message;

	// eslint-disable-next-line
	console.error( message );
	throw new Error( 'Oops!' );
}

/**
 * Discover API.
 *
 * @param {string} siteUrl Site URL.
 * @return {string} apiRoot.
 */
export function discoverApi( siteUrl ) {
	return axios.head( siteUrl )
		.then( response => {
			const { headers } = response;
			const { link } = headers;
			const regex = RegExp( '<(.*)>; rel="https://api.w.org/"' );
			const result = regex.exec( link );
			const apiRoot = trim( result[ 1 ], '/' );

			return apiRoot;
		} )
		.catch( () => oops( new Error( `${ siteUrl } not found.` ) ) );
}

export function getTaxonomies() {
	return axios.get( '/wp/v2/taxonomies' )
		.then( response => collectItems( response.data ) )
		.catch( oops );
}

export function getInfo() {
	return axios.get( '/bridge/v1/info' )
		.then( response => response.data )
		.catch( oops );
}

/**
 * Normalize fetch parameters
 *
 * TODO: (Maybe) get taxonomy maps from API after discovery.
 *
 * @param {object} params Fetch parameters.
 * @return {object}
 */
export function normalizeParams( params, taxonomies ) {
	const taxNames = taxonomies.map( tax => tax.slug );
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
					const tax = taxonomies.find( tax => key === tax.slug );

					if ( ! tax ) {
						break;
					}

					let queryVar;
					if ( key === 'category' ) {
						queryVar = 'category_name';
					} else if ( key === 'post_tag' ) {
						queryVar = 'tag'
					} else {
						queryVar = key;
					}

					const queryValue = key === 'post_format'
						? `post-format-${ value }`
						: value;

					filter = {
						...filter,
						[ queryVar ]: queryValue,
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

/**
 * Configure axios' defaults
 *
 * @param {string} apiRoot API Root.
 */
export function configureAxios( apiRoot ) {
	axios.defaults.baseURL = apiRoot;
	axios.defaults.headers = { 'X-Requested-With': 'minnie' };
	axios.defaults.paramsSerializer = params => stringify( params, {
		arrayFormat: 'brackets',
	} );
}

/**
 * Collect response data as items array
 *
 * @param {object|array} data Response data.
 * @return array
 */
export function collectItems( data ) {
	return Object.keys( data ).map( slug => {
		const { _links, ...props } = data[ slug ];

		return props;
	} );
}

/**
 * Get fetch params for archive term
 *
 * @param {object} params     Route fetch params.
 * @param {array}  taxonomies Taxonomies.
 *
 * @return {object|null}
 */
export function getArchiveTermParams( params, taxonomies ) {
	// Search results page.
	if ( params.hasOwnProperty( 'search' ) ) {
		return null;
	}

	let termParams = null;
	Object.entries( params ).forEach( param => {
		const [ key, value ] = param;
		const tax = taxonomies.find( item => item.slug === key );

		if ( ! tax ) {
			return;
		}

		termParams = {
			endpoint: tax.rest_base,
			slug: key === 'post_format'
				? `post-format-${ value }`
				: value,
		}
	} );

	return termParams;
}
