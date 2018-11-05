import { trim } from 'lodash';

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
	nextLink: '',
	prevLink: '',
	searchTerm: '',
	term: null,
	url: '',
};

/**
 * Add nextLink & prevLink to state
 *
 * @param {object} state Current state.
 * @return {object}
 */
function setLinks( state ) {
	const regex = /\/page\/[\d+]/;
	const { currentPage, hasMore, url } = state;
	let nextLink = '';
	let prevLink = '';

	if ( currentPage === 1 && ! hasMore ) {
		return {
			...state,
			nextLink,
			prevLink,
		};
	}

	if ( hasMore ) {
		const prevPage = currentPage + 1;

		if ( currentPage === 1 ) {
			prevLink = `${ url }/page/${ prevPage }`;
		} else {
			prevLink = url.replace( regex, `/page/${ prevPage }` );
		}
	}

	if ( currentPage > 2 ) {
		nextLink = url.replace( regex, `/page/${ currentPage - 1 }` );
	} else if ( currentPage === 2 ) {
		nextLink = url.replace( regex, '' );
	}

	return {
		...state,
		nextLink: nextLink ? `/${ trim( nextLink, '/' ) }` : '',
		prevLink: prevLink ? `/${ trim( prevLink, '/' ) }` : '',
	};
}

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

			return setLinks( {
				...state,
				searchTerm,
				currentPage,
				items: action.req.data,
				isHome: ( Object.keys( fetchParams ).length < 2 && searchTerm === '' ),
				hasMore: currentPage < Number( action.req.headers[ 'x-wp-totalpages' ] ),
				isFetching: false,
			} );
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
