import axios from 'axios'
import { polyfill } from 'es6-promise';
import { GET_TERMS } from 'constants/index'


polyfill();

export function makeTermsRequest( taxonomy, params ) {
	return axios({
		method: 'get',
		url: `/wp/v2/${taxonomy}`,
		params: params
	})
}

export function fetchTerms( taxonomy, params = {} ) {
	return {
		type: GET_TERMS,
		taxonomy: taxonomy,
		promise: makeTermsRequest( taxonomy, params )
	}
}

export function fetchPostFormats() {
	return fetchTerms( 'formats' )
}
