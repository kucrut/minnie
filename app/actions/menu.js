import { polyfill } from 'es6-promise';
import request from 'axios'
import { GET_MENU } from 'constants/index'


polyfill();

function makeMenuRequest( location ) {
	return request({
		method: 'get',
		url: `/wp-api-menus/v2/menu-locations/${location}`
	})
}

export function fetchMenu( location ) {
	return {
		type: GET_MENU,
		location: location,
		promise: makeMenuRequest( location )
	}
}

export function fetchPrimaryMenu() {
	return fetchMenu( 'primary' )
}

export function fetchSocialMenu() {
	return fetchMenu( 'social' )
}
