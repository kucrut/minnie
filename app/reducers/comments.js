import {
	GET_COMMENTS_REQUEST,
	GET_COMMENTS_SUCCESS,
	GET_COMMENTS_FAILURE
} from 'constants/index';

const initialState = {
	post:        0,
	items:       [],
	hasMore:     false,
	currentPage: 0,
	isFetching:  false
};

export default function comments( state = initialState, action ) {
	let items;
	let params;
	let currentPage;

	switch ( action.type ) {
		case GET_COMMENTS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			});

		case GET_COMMENTS_SUCCESS:
			params      = action.req.config.params;
			currentPage = parseInt( params.page, 10 ) || 1;
			items       = ( params.post === state.post && 1 < currentPage ) ?
							state.items.concat( action.req.data ) :
							action.req.data;

			return Object.assign({}, state, {
				post:       params.post,
				hasMore:    currentPage < action.req.headers[ 'x-wp-totalpages' ],
				isFetching: false,
				currentPage,
				items
			});

		case GET_COMMENTS_FAILURE:
			return Object.assign({}, state, {
				isFetching: false
			});

		default:
			return state;
	}
}
