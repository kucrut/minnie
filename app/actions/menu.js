import { polyfill } from 'es6-promise';
import request from 'axios';
import { GET_MENU } from 'constants/index';

polyfill();

function makeMenuRequest( location ) {
	return request( {
		method: 'get',
		url: `/bridge/v1/menus/${location}`,
	} );
}

export function fetchMenu( location ) {
	return {
		type: GET_MENU,
		promise: makeMenuRequest( location ),
		location,
	};
}

export function fetchPrimaryMenu() {
	return fetchMenu( 'primary' );
}

export function fetchSocialMenu() {
	return fetchMenu( 'social' );
}
