import request from 'axios';

import {
	GET_SINGULAR,
	GET_COMMENTS_FAILURE,
	GET_COMMENTS_REQUEST,
	GET_COMMENTS_SUCCESS,
} from '../constants';
import { fetchComments } from './comments';

function makeSingularRequest( slug, type = 'pages' ) {
	return request( {
		method: 'get',
		url: `/wp/v2/${type}`,
		params: { slug },
	} );
}

export function fetchPage( { params } ) {
	const { slug } = params;

	return {
		slug,
		type: GET_SINGULAR,
		promise: makeSingularRequest( slug, 'pages' ),
	};
}

async function fetchPostWithComments( slug, dispatch, getState ) {
	const postReq = await makeSingularRequest( slug, 'posts' );
	const { data } = postReq;

	if ( ! data.length ) {
		// TODO.
		const error = { slug };

		throw error;
	}

	const postId = data[ 0 ].id;
	const parentId = 0;
	const commentsReq = await fetchComments( {
		post: postId,
		per_page: getState().info.settings.comments.per_page,
	} );

	dispatch( {
		type: GET_COMMENTS_REQUEST,
		parentId,
		postId,
	} );

	if ( commentsReq.data ) {
		dispatch( {
			type: GET_COMMENTS_SUCCESS,
			req: commentsReq,
			parentId,
			postId,
		} );
	} else {
		dispatch( {
			type: GET_COMMENTS_FAILURE,
			parentId,
		} );
	}

	return Promise.resolve( postReq );
}

export function fetchPost( { params } ) {
	const { slug } = params;

	return ( dispatch, getState ) => dispatch( {
		slug,
		type: GET_SINGULAR,
		promise: fetchPostWithComments( slug, dispatch, getState ),
	} );
}

export function fetchMedia( { params } ) {
	const { slug } = params;

	return {
		slug,
		type: GET_SINGULAR,
		promise: makeSingularRequest( slug, 'media' ),
	};
}
