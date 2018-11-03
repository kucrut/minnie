import { head } from 'lodash';

import {
	GET_SINGULAR_REQUEST,
	GET_SINGULAR_SUCCESS,
	GET_SINGULAR_FAILURE,
} from '../constants';

const initialTitle = 'Oops! That page can&rsquo;t be found.';
const initialState = {
	data: {},
	isFetching: false,
};

export default function singular( state = initialState, action ) {
	let data;
	let slug;

	switch ( action.type ) {
		case GET_SINGULAR_REQUEST:
			return Object.assign( {}, initialState, {
				isFetching: true,
			} );

		case GET_SINGULAR_SUCCESS:
			if ( action.isPreview ) {
				data = action.req.data;
				slug = `preview-${action.postId}`;
			} else {
				data = head( action.req.data, 1 );
				slug = action.req.config.params.slug;
			}

			/**
		 * Page/post not found.
		 *
		 * We need to store the `slug` so the component will know
		 * that we've already requested the page.
		 */
			if ( ! data ) {
				data = {
					title: initialTitle,
					slug,
				};
			}

			return Object.assign( {}, state, {
				isFetching: false,
				data,
			} );

		case GET_SINGULAR_FAILURE:
			return Object.assign( {}, initialState );

		default:
			return state;
	}
}
