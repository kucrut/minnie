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

function fetchPostWithComments( dispatch, slug ) {
	return makeSingularRequest( slug, 'posts' )
		.then( postReq => Promise.all( [
			postReq,
			dispatch( fetchComments( { post: postReq.data[ 0 ].id } ) ),
		] ) )
		.then( results => Promise.resolve( results[ 0 ] ) );
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
