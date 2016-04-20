import axios from 'axios'
import { polyfill } from 'es6-promise'
import { GET_ARCHIVE, GET_ARCHIVE_TERM, GET_ARCHIVE_TERM_FAILURE } from 'constants/index'
import { makeTermsRequest } from 'actions/terms'
import { normalizeParams, getArchiveTaxonomyTerm } from 'helpers.js'


polyfill();

function makeArchiveRequest( params ) {
	return axios({
		method: 'get',
		url: '/wp/v2/posts',
		params: params
	})
}

export function fetchArchive( params = {} ) {
	return {
		type: GET_ARCHIVE,
		fetchParams: params,
		promise: makeArchiveRequest( normalizeParams( params ) )
	}
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
	params = getArchiveTaxonomyTerm( params )

	if ( null === params || params.search ) {
		return {
			type: GET_ARCHIVE_TERM_FAILURE
		}
	} else {
		return {
			type: GET_ARCHIVE_TERM,
			promise: makeTermsRequest( params.endpoint, { slug: params.slug } )
		}
	}
}