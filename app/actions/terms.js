import { polyfill } from 'es6-promise';
import request from 'axios'
import { GET_TERMS } from 'constants/index'


polyfill();

export function fetchTerms( taxonomy, params = {} ) {
	return {
		type: GET_TERMS,
		taxonomy: taxonomy,
		promise: request({
			url: `/wp/v2/${taxonomy}`,
			params: params,
		})
	}
}

export function fetchPostFormats() {
	return fetchTerms( 'formats' )
}
