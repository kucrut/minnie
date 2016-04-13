import head from 'lodash/head'
import {
	GET_SINGULAR_REQUEST,
	GET_SINGULAR_SUCCESS,
	GET_SINGULAR_FAILURE
} from 'constants/index'



const initialTitle = 'Oops! That page can&rsquo;t be found.'
const initialState = {
	data: {},
	isFetching: false
}

export default function singular( state = initialState, action ) {
	switch ( action.type ) {
		case GET_SINGULAR_REQUEST:
			return Object.assign( {}, state, {
				isFetching: true
			});

		case GET_SINGULAR_SUCCESS:
			let data = head( action.req.data, 1 );

			// Page/post not found.
			if ( ! data ) {
				data = {
					slug: action.req.config.params.slug,
					title: initialTitle
				}
			}

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
