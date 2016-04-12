import { size } from 'lodash'
import {
	GET_ARCHIVE_REQUEST,
	GET_ARCHIVE_SUCCESS,
	GET_ARCHIVE_FAILURE
} from 'constants/index'



const initialState = {
	items: [],
	isHome: true,
	currentPage: -1,
	hasMore: false,
	isFetching: false
}

export default function archive( state = initialState, action ) {
	switch ( action.type ) {
		case GET_ARCHIVE_REQUEST:
			return Object.assign( {}, state, {
				isFetching: true
			})

		case GET_ARCHIVE_SUCCESS:
			const { params } = action.req.config
			const currentPage = parseInt( params.page, 10 ) || 1

			return Object.assign( {}, state, {
				items: action.req.data,
				isHome: 2 > size( params ),
				currentPage: currentPage,
				hasMore: currentPage < action.req.headers['x-wp-totalpages'],
				isFetching: false
			})

		case GET_ARCHIVE_FAILURE:
			return Object.assign( {}, state,  initialState )

		default:
			return state
	}
}
