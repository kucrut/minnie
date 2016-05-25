import axios from 'axios';
import { GET_SESSION } from 'constants/index';

export function checkSession( username, password ) {
	const token = btoa( `${username}:${password}` );

	return {
		token,
		type:    GET_SESSION,
		promise: axios({
			method:  'get',
			url:     '/wp/v2/users/me',
			headers: {
				Authorization: `Basic ${token}`
			}
		})
	};
}
