import request from 'axios';
import { polyfill } from 'es6-promise';
import { GET_COMMENTS, POST_COMMENT } from 'constants/index';

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
		type:     GET_COMMENTS,
		promise:  makeRequest( fetchParams ),
		postId:   fetchParams.post,
		parentId: fetchParams.parent
	};
}

export function postComment( data ) {
	return {
		type:     POST_COMMENT,
		postId:   data.comment_post_ID,
		parentId: data.comment_parent,
		promise:  request({
			method: 'post',
			url:    '/wp/v2/comments',
			data:   {
				post:         data.comment_post_ID,
				parent:       data.comment_parent,
				author_name:  data.author,
				author_email: data.email,
				author_url:   data.url,
				content:      data.comment
			}
		})
	};
}
