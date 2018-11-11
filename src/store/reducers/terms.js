import {
	GET_TERMS_REQUEST,
	GET_TERMS_SUCCESS,
	GET_TERMS_FAILURE,
} from '../constants';

const initialState = {
	items: {},
	isFetching: false,
};

export default function taxonomies( state = initialState, action ) {
	switch ( action.type ) {
		case GET_TERMS_REQUEST:
			return {
				...state,
				isFetching: true,
			};

		case GET_TERMS_SUCCESS:
			return {
				...state,
				items: {
					...state.items,
					[ action.taxonomy ]: action.req.data,
				},
				isFetching: false,
			};

		case GET_TERMS_FAILURE:
			return {
				...state,
				isFetching: false,
			};

		default:
			return state;
	}
}
