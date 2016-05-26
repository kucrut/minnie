import { polyfill } from 'es6-promise';
import request from 'axios';
import { GET_SINGULAR } from 'constants/index';


polyfill();

const postTypeMap = {
	post: 'posts',
	page: 'pages'
};

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

export function fetchPost( params ) {
	return {
		type:    GET_SINGULAR,
		promise: makeSingularRequest( params.slug, 'posts' )
	};
}

export function fetchMedia( params ) {
	return {
		type:    GET_SINGULAR,
		promise: makeSingularRequest( params.slug, 'media' )
	};
}

export function fetchPreview( params ) {
	const { id, type } = params;
	const postType = postTypeMap[ type ];

	return ( dispatch, getState ) => {
		const { token } = getState().session;

		dispatch({
			type:      GET_SINGULAR,
			isPreview: true,
			postId:    id,
			promise:   request({
				method:  'get',
				url:     `/wp/v2/${postType}/${id}`,
				headers: { Authorization: `Basic ${token}` }
			})
		});
	};
}
