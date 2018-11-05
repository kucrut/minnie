import {
	GET_ARCHIVE_REQUEST,
	GET_ARCHIVE_SUCCESS,
	GET_ARCHIVE_FAILURE,
	GET_ARCHIVE_TERM_SUCCESS,
	GET_ARCHIVE_TERM_FAILURE,
} from '../constants';

const initialState = {
	currentPage: 0,
	fetchParams: {},
	hasMore: false,
	isFetching: false,
	isHome: true,
	items: [],
	searchTerm: '',
	term: null,
	url: '',
};

export default function archive( state = initialState, action ) {
	const { type } = action;

	switch ( type ) {
		case GET_ARCHIVE_REQUEST: {
			return {
				...state,
				isFetching: true,
				url: action.url,
				fetchParams: action.fetchParams,
			};
		}

		case GET_ARCHIVE_SUCCESS: {
			const { fetchParams } = state;
			const { page, search: searchTerm = '' } = fetchParams;
			const currentPage = Number( page ) || 1;

			return {
				...state,
				searchTerm,
				currentPage,
				items: action.req.data,
				isHome: ( Object.keys( fetchParams ).length < 2 && searchTerm === '' ),
				hasMore: currentPage < Number( action.req.headers[ 'x-wp-totalpages' ] ),
				isFetching: false,
			};
		}

		case GET_ARCHIVE_FAILURE: {
			return initialState;
		}

		case GET_ARCHIVE_TERM_SUCCESS: {
			return {
				...state,
				term: action.term || action.req.data[0],
			};
		}

		case GET_ARCHIVE_TERM_FAILURE: {
			return {
				...state,
				term: null,
			};
		}

		default: {
			return state;
		}
	}
}
