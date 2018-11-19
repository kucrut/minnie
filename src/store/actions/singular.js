import request from 'axios';

import { GET_SINGULAR } from '../constants';
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

async function fetchPostWithComments( dispatch, slug ) {
	const postReq = await makeSingularRequest( slug, 'posts' );
	const { data } = postReq;

	if ( ! data.length ) {
		throw new Error( 'Not found.' );
	}

	dispatch( fetchComments( { post: postReq.data[ 0 ].id } ) );

	return Promise.resolve( postReq );
}

export function fetchPost( { params } ) {
	const { slug } = params;

	return dispatch => dispatch( {
		slug,
		type: GET_SINGULAR,
		promise: fetchPostWithComments( dispatch, slug ),
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
