import {
	GET_INFO_REQUEST,
	GET_INFO_SUCCESS,
	GET_INFO_FAILURE
} from 'constants/index'


const initialState = {
	name: '',
	description: '',
	namespaces: []
}

export default function info( state = initialState, action ) {
	switch ( action.type ) {
		case GET_INFO_REQUEST:
			return Object.assign( {}, state, {
				isFetching: true
			});

		case GET_INFO_SUCCESS:
			return Object.assign( {}, state, {
				isFetching: false,
				name: action.req.data.name,
				description: action.req.data.description,
				namespaces: action.req.data.namespaces
			});

		case GET_INFO_FAILURE:
			return Object.assign( {}, state, {
				isFetching: false
			});

		default:
			return state
	}
}
