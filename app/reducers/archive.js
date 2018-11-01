import { head, size } from 'lodash';
import {
	GET_ARCHIVE_REQUEST,
	GET_ARCHIVE_SUCCESS,
	GET_ARCHIVE_FAILURE,
	GET_ARCHIVE_TERM_SUCCESS,
	GET_ARCHIVE_TERM_FAILURE,
} from 'constants/index';

const initialState = {
	items: [],
	isHome: true,
	term: null,
	searchTerm: '',
	currentPage: 0,
	hasMore: false,
	fetchParams: {},
	isFetching: false,
};

export default function archive( state = initialState, action ) {
	let params;
	let currentPage;
	let searchTerm;

	switch ( action.type ) {
		case GET_ARCHIVE_REQUEST:
			return Object.assign( {}, state, {
				isFetching: true,
			} );

		case GET_ARCHIVE_SUCCESS:
			params      = action.req.config.params;
			currentPage = parseInt( params.page, 10 ) || 1;
			searchTerm  = params.search || '';

			return Object.assign( {}, state, {
				items: action.req.data,
				isHome: ( size( params ) < 1 && searchTerm === '' ),
				hasMore: currentPage < action.req.headers[ 'x-wp-totalpages' ],
				fetchParams: action.fetchParams,
				isFetching: false,
				searchTerm,
				currentPage,
			} );

		case GET_ARCHIVE_FAILURE:
			return initialState;

		case GET_ARCHIVE_TERM_SUCCESS:
			return Object.assign( {}, state, {
				term: head( action.req.data ),
			} );

		case GET_ARCHIVE_TERM_FAILURE:
			return Object.assign( {}, state, {
				term: null,
			} );

		default:
			return state;
	}
}
