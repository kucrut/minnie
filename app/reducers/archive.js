import head from 'lodash/head'
import { normalizeParams } from 'helpers.js'
import {
	GET_ARCHIVE_REQUEST,
	GET_ARCHIVE_SUCCESS,
	GET_ARCHIVE_FAILURE
} from 'constants/index'



const initialState = {
	items: [],
	currentPage: 1,
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
			const params = normalizeParams( action.req.config.params )
			const currentPage = params.page

			return Object.assign( {}, state, {
				items: action.req.data,
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
