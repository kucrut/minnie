import axios from 'axios';

import { GET_ARCHIVE, GET_ARCHIVE_TERM, GET_ARCHIVE_TERM_FAILURE } from '../constants';
import { makeTermsRequest } from './terms';
import { checkOtherState, normalizeParams, getArchiveTaxonomyTerm } from '../helpers';

function makeArchiveRequest( params ) {
	return axios( {
		method: 'get',
		url: '/wp/v2/posts',
		params,
	} );
}

export function fetchArchive( params = {} ) {
	return ( dispatch, getState ) => dispatch( {
		type: GET_ARCHIVE,
		fetchParams: params,
		// TODO: Seriously, REFACTOR this!
		promise: checkOtherState( getState, 'info' )
			.then( info => {
				const { settings } = info;
				const { archive } = settings;
				const { per_page } = archive;

				return Promise.all( [
					info,
					makeArchiveRequest( normalizeParams( {
						...params,
						per_page,
					} ) ),
				] ).then( results => Promise.resolve( results[ 1 ] ) );
			 } ),
	} );
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
	const fetchParams = getArchiveTaxonomyTerm( params );

	if ( fetchParams === null || fetchParams.search ) {
		return { type: GET_ARCHIVE_TERM_FAILURE };
	}

	return {
		type: GET_ARCHIVE_TERM,
		promise: makeTermsRequest( fetchParams.endpoint, { slug: fetchParams.slug } ),
	};
}
