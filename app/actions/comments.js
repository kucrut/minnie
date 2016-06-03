import request from 'axios';
import { polyfill } from 'es6-promise';
import { GET_COMMENTS } from 'constants/index';

polyfill();

const defaultParams = {
	parent: 0
};

function makeRequest( params ) {
	return request({
		method: 'get',
		url:    '/wp/v2/comments',
		params
	});
}

export function fetchComments( params ) {
	const fetchParams = Object.assign({}, defaultParams, params );

	return {
		type:    GET_COMMENTS,
		promise: makeRequest( fetchParams )
	};
}
