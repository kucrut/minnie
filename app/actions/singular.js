import request from 'axios';
import { polyfill } from 'es6-promise';
import { GET_SINGULAR } from 'constants/index';
import { fetchComments } from 'actions/comments';

polyfill();

function makeSingularRequest( slug, type = 'pages' ) {
	return request({
		method: 'get',
		url:    `/wp/v2/${type}`,
		params: { slug }
	});
}

export function fetchPage( params ) {
	return {
		type:    GET_SINGULAR,
		promise: makeSingularRequest( params.slug, 'pages' )
	};
}

function fetchPostWithComments( dispatch, slug ) {
	return makeSingularRequest( slug, 'posts' )
		.then( postReq => Promise.all( [
			postReq,
			dispatch( fetchComments({
				post: postReq.data[ 0 ].id
			}) )
		] ) )
		.then( results => Promise.resolve( results[ 0 ] ) );
}

export function fetchPost( params ) {
	return dispatch => dispatch({
		type:    GET_SINGULAR,
		promise: fetchPostWithComments( dispatch, params.slug )
	});
}

export function fetchMedia( params ) {
	return {
		type:    GET_SINGULAR,
		promise: makeSingularRequest( params.slug, 'media' )
	};
}
