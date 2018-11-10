import request from 'axios';

import { GET_COMMENTS, POST_COMMENT } from '../constants';

const defaultParams = { parent: 0 };

function makeRequest( params ) {
	return request( {
		method: 'get',
		url: '/wp/v2/comments',
		params,
	} );
}

/**
 *  Fetch comments
 *
 *  Before actually fetching the comments, we need to wait for site info
 *  to be fetched.
 *
 *  @param  {object} params
 *  @return {object}
 */
export function fetchComments( params ) {
	const fetchParams = Object.assign( {}, defaultParams, params );

	return ( dispatch, getState ) => {
		const { info } = getState();
		const { settings } = info;
		const { comments } = settings;
		const { per_page } = comments;

		return dispatch( {
			type: GET_COMMENTS,
			postId: fetchParams.post,
			parentId: fetchParams.parent,
			promise: makeRequest( {
				...fetchParams,
				per_page,
			} ),
		} );
	};
}

export function postComment( data ) {
	return {
		type: POST_COMMENT,
		postId: data.post,
		parentId: data.parent,
		promise: request( {
			method: 'post',
			url: '/wp/v2/comments',
			data,
		} ),
	};
}
