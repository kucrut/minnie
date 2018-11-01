import {
	GET_TAXONOMIES_REQUEST,
	GET_TAXONOMIES_SUCCESS,
	GET_TAXONOMIES_FAILURE,
} from 'constants/index';

const initialState = {
	items: {},
	isFetching: false,
};

export default function taxonomies( state = initialState, action ) {
	switch ( action.type ) {
		case GET_TAXONOMIES_REQUEST:
			return Object.assign( {}, state, {
				isFetching: true,
			} );

		case GET_TAXONOMIES_SUCCESS:
			return Object.assign( {}, state, {
				isFetching: false,
				items: action.req.data,
			} );

		case GET_TAXONOMIES_FAILURE:
			return Object.assign( {}, state, {
				isFetching: false,
			} );

		default:
			return state;
	}
}
