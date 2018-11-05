import axios from 'axios';

import {
	GET_ARCHIVE,
	GET_ARCHIVE_TERM,
	GET_ARCHIVE_TERM_FAILURE,
	GET_ARCHIVE_TERM_SUCCESS,
} from '../constants';
import { makeTermsRequest } from './terms';
import { normalizeParams, getArchiveTermParams } from '../../api/utils';

function makeArchiveRequest( params ) {
	return axios( {
		method: 'get',
		url: '/wp/v2/posts',
		params,
	} );
}

export function fetchArchive( args ) {
	return ( dispatch, getState ) => {
		const { info, taxonomies } = getState();
		const { settings } = info;
		const { archive } = settings;
		const { per_page } = archive;

		const { url, params } = args;
		const fetchParams = normalizeParams( {
			...params,
			per_page,
		}, taxonomies.items );

		return dispatch( {
			url,
			fetchParams,
			type: GET_ARCHIVE,
			promise: makeArchiveRequest( fetchParams ),
		} );
	};
}

/**
 * Fetch archive page's term object
 *
 * This the equivalent of `get_queried_object()` in WordPress.
 *
 * @param  {Object} params [description]
 * @return {Object}
 */
export function fetchArchiveTerm( params = {} ) {
	return ( dispatch, getState ) => {
		const { taxonomies, terms } = getState();
		const fetchParams = getArchiveTermParams( params, taxonomies.items );

		if ( ! fetchParams ) {
			return {
				type: GET_ARCHIVE_TERM_FAILURE,
			};
		}

		const { endpoint, slug } = fetchParams;

		if ( terms.items.hasOwnProperty( endpoint ) ) {
			const term = terms.items[ endpoint ].find( item => item.slug === slug );

			if ( term ) {
				return dispatch( {
					type: GET_ARCHIVE_TERM_SUCCESS,
					term,
				} );
			}
		}

		return dispatch( {
			type: GET_ARCHIVE_TERM,
			promise: makeTermsRequest( endpoint, { slug } ),
		} );
	}
}
