import axios from 'axios';

import { GET_ARCHIVE, GET_ARCHIVE_TERM, GET_ARCHIVE_TERM_FAILURE } from '../constants';
import { makeTermsRequest } from './terms';
import { normalizeParams, getArchiveTermParams } from '../../api/utils';

function makeArchiveRequest( params ) {
	return axios( {
		method: 'get',
		url: '/wp/v2/posts',
		params,
	} );
}

export function fetchArchive( params = {} ) {
	return ( dispatch, getState ) => {
		const { info, taxonomies } = getState();
		const { settings } = info;
		const { archive } = settings;
		const { per_page } = archive;
		const fetchParams = normalizeParams( {
			...params,
			per_page,
		}, taxonomies.items );

		return dispatch( {
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
		const { taxonomies } = getState();
		const fetchParams = getArchiveTermParams( params, taxonomies.items );

		if ( ! fetchParams ) {
			return {
				type: GET_ARCHIVE_TERM_FAILURE,
			};
		}

		const { endpoint, slug } = fetchParams;

		return dispatch( {
			type: GET_ARCHIVE_TERM,
			promise: makeTermsRequest( endpoint, { slug } ),
		} );
	}
}
