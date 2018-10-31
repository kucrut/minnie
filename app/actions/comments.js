import request from 'axios';
import { GET_COMMENTS, POST_COMMENT } from 'constants/index';
import { checkOtherState } from 'helpers';

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

	return ( dispatch, getState ) => dispatch( {
		type: GET_COMMENTS,
		postId: fetchParams.post,
		parentId: fetchParams.parent,
		promise: checkOtherState( getState, 'info' )
			.then( info => Promise.all( [
				info,
				makeRequest( Object.assign( { per_page: info.settings.comments.per_page }, fetchParams ) ),
			] ).then( results => Promise.resolve( results[ 1 ] ) ) ),
			// TODO: Check if info contains error.
	} );
}

export function postComment( data ) {
	return {
		type: POST_COMMENT,
		postId: data.post,
		parentId: data.parent,
		promise: request( {
			method: 'post',
			url:    '/wp/v2/comments',
			data,
		} ),
	};
}
