import { polyfill } from 'es6-promise';
import request from 'axios'
import * as types from 'constants/index'


polyfill();

function makeMenuRequest( location ) {
	return request({
		method: 'get',
		url: `/wp-api-menus/v2/menu-locations/${location}`
	})
}

export function fetchMenu() {
	return {
		type: types.GET_MENU,
		location: this.location,
		promise: makeMenuRequest( this.location )
	}
}
