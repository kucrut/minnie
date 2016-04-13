import axios from 'axios'
import { polyfill } from 'es6-promise'
import { GET_ARCHIVE, GET_ARCHIVE_TERM } from 'constants/index'
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
	const termParams    = getArchiveTaxonomyTerm( params )
	const archiveParams = normalizeParams( params )

	return ( dispatch, getState ) => {
		dispatch({
			type: GET_ARCHIVE,
			promise: makeArchiveRequest( archiveParams )
		})

		if ( null !== termParams ) {
			dispatch({
				type: GET_ARCHIVE_TERM,
				promise: makeTermsRequest( termParams.endpoint, { slug: termParams.slug } )
			})
		}
	}
}
