import axios from 'axios';
import {
	GET_SESSION_REQUEST,
	GET_SESSION_SUCCESS,
	GET_SESSION_FAILURE
} from 'constants/index';

function saveToken( token ) {
	localStorage.setItem( 'minnieToken', token );
}

const initialState = {
	isChecking: false,
	token:      '',
	user:       {}
};

export default function session( state = initialState, action ) {
	switch ( action.type ) {
		case GET_SESSION_REQUEST:
			return Object.assign({}, state, {
				isChecking: true
			});

		case GET_SESSION_SUCCESS:
			saveToken( action.token );

			axios.defaults.headers = Object.assign({}, axios.defaults.headers, {
				Authorization: `Basic ${action.token}`
			});

			return Object.assign({}, state, {
				isChecking: false,
				token:      action.token,
				user:       action.req.data
			});

		case GET_SESSION_FAILURE:
			saveToken( '' );

			return initialState;

		default:
			return state;
	}
}
