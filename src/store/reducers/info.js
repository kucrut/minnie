import {
	GET_INFO_REQUEST,
	GET_INFO_SUCCESS,
	GET_INFO_FAILURE,
} from '../constants';

const initialState = {
	apiUrl: '', // This will be set by `render()` in `server.jsx`
	lang: '',
	name: '',
	description: '',
	settings: {},
	isFetching: false,
};

export default function info( state = initialState, action ) {
	switch ( action.type ) {
		case GET_INFO_REQUEST:
			return Object.assign( {}, state, {
				isFetching: true,
			} );

		case GET_INFO_SUCCESS:
			return Object.assign( {}, state, {
				lang: action.req.data.lang,
				name: action.req.data.name,
				description: action.req.data.description,
				settings: action.req.data.settings,
				isFetching: false,
			} );

		case GET_INFO_FAILURE:
			return Object.assign( {}, state, {
				isFetching: false,
			} );

		default:
			return state;
	}
}
