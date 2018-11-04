import axios from 'axios';
import { trim } from 'lodash';

import { taxonomyMap } from '../config/app';

/**
 * Discover API.
 *
 * @param {string} siteUrl Site URL.
 * @return {string} apiRoot.
 */
export async function discoverApi( siteUrl ) {
	return axios.head( siteUrl )
		.then( response => {
			const { headers } = response;
			const { link } = headers;
			const regex = RegExp( '<(.*)>; rel="https://api.w.org/"' );
			const result = regex.exec( link );
			const apiRoot = trim( result[ 1 ], '/' );

			return apiRoot;
		} );
}

/**
 * Normalize fetch parameters
 *
 * TODO: (Maybe) get taxonomy maps from API after discovery.
 *
 * @param {object} params Fetch parameters.
 * @return {object}
 */
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
