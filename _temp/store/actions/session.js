import axios from 'axios';

import { getToken } from '../../helpers';
import { GET_SESSION, GET_SESSION_FAILURE } from '../constants';

function makeSessionRequest( token ) {
	return {
		token,
		type: GET_SESSION,
		promise: axios( {
			method: 'get',
			url: '/wp/v2/users/me',
			headers: { Authorization: `Basic ${token}` },
		} ),
	};
}

/**
 * Check last session
 *
 * This should only be called from browser.
 */
export function checkLastSession() {
	const token = getToken();

	if ( ! token ) {
		return { type: GET_SESSION_FAILURE };
	}

	return makeSessionRequest( token );
}

export function checkSession( username, password ) {
	const token = btoa( `${username}:${password}` );

	return makeSessionRequest( token );
}
