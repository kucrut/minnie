import head from 'lodash/head'
import {
	GET_ARCHIVE_REQUEST,
	GET_ARCHIVE_SUCCESS,
	GET_ARCHIVE_FAILURE
} from 'constants/index'



const initialState = {
	items: [],
	isFetching: false
}

export default function archive( state = initialState, action ) {
	switch ( action.type ) {
		case GET_ARCHIVE_REQUEST:
			return Object.assign( {}, state, {
				isFetching: true
			});

		case GET_ARCHIVE_SUCCESS:
			return Object.assign( {}, state, {
				items: state.items.concat( action.req.data ),
				isFetching: false
			});

		case GET_ARCHIVE_FAILURE:
			return Object.assign( {}, state,  initialState )

		default:
			return state
	}
}
