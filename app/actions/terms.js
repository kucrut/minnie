import axios from 'axios';
import { polyfill } from 'es6-promise';
import { GET_TERMS } from 'constants/index';

polyfill();

export function makeTermsRequest( taxonomy, params ) {
	return axios( {
		method: 'get',
		url: `/wp/v2/${taxonomy}`,
		params,
	} );
}

export function fetchTerms( taxonomy, params = {} ) {
	return {
		type: GET_TERMS,
		promise: makeTermsRequest( taxonomy, params ),
		taxonomy,
	};
}

export function fetchPostFormats() {
	return fetchTerms( 'formats' );
}
