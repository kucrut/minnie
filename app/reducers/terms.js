import {
	GET_TERMS_REQUEST,
	GET_TERMS_SUCCESS,
	GET_TERMS_FAILURE,
} from 'constants/index';

const initialState = {
	items: {},
	isFetching: false,
};

export default function taxonomies( state = initialState, action ) {
	let mergedItems;

	switch ( action.type ) {
		case GET_TERMS_REQUEST:
			return Object.assign( {}, state, {
				isFetching: true,
			} );

		case GET_TERMS_SUCCESS:
			mergedItems = Object.assign( {}, state.items, {
				[ action.taxonomy ]: action.req.data,
			} );

			return Object.assign( {}, state, {
				items: mergedItems,
				isFetching: false,
			} );

		case GET_TERMS_FAILURE:
			return Object.assign( {}, state, {
				isFetching: false,
			} );

		default:
			return state;
	}
}
