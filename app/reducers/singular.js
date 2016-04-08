import head from 'lodash/head'
import {
	GET_SINGULAR_REQUEST,
	GET_SINGULAR_SUCCESS,
	GET_SINGULAR_FAILURE
} from 'constants/index'


const initialState = {
	data: {},
	isFetching: false
}

export default function content( state = initialState, action ) {
	switch ( action.type ) {
		case GET_SINGULAR_REQUEST:
			return Object.assign( {}, state, {
				data: {}, // Should we keep the old data?
				isFetching: true
			});

		case GET_SINGULAR_SUCCESS:
			let data = head( action.req.data, 1 );

			return Object.assign( {}, state, {
				data: data,
				isFetching: false
			});

		case GET_SINGULAR_FAILURE:
			return Object.assign( {}, state,  initialState );

		default:
			return state
	}
}
