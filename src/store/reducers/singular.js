import {
	GET_SINGULAR_REQUEST,
	GET_SINGULAR_SUCCESS,
	GET_SINGULAR_FAILURE,
} from '../constants';

const initialState = {
	data: {},
	error: null,
	isFetching: false,
};

export default function singular( state = initialState, action ) {
	switch ( action.type ) {
		case GET_SINGULAR_REQUEST: {
			return {
				...state,
				error: null,
				isFetching: true,
			};
		}

		case GET_SINGULAR_SUCCESS: {
			const { data } = action.req;
			let newData;

			if ( data.id ) {
				// Preview.
				newData = data;
			} else if ( data.length ) {
				// Singular post/page.
				newData = data[0];
			} else {
				// Not found; the API returns 200 with empty set of result.
				newData = { slug: action.slug };
			}

			return {
				...state,
				data: newData,
				error: null,
				isFetching: false,
			}
		}

		case GET_SINGULAR_FAILURE: {
			return {
				...initialState,
				data: action.error,
			};
		}

		default: {
			return state;
		}
	}
}
