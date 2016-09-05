import request from 'axios';
import { polyfill } from 'es6-promise';
import { push } from 'react-router-redux';
import { postTypeMap, GET_SINGULAR } from 'constants/index';

polyfill();

export default function fetchPreview( params ) {
	const { id, type } = params;
	const postType = postTypeMap[ type ];

	return ( dispatch, getState ) => {
		const { user, token } = getState().session;
		let path;

		if ( ! user.id || ! token ) {
			path = `/preview/${type}/${id}`;

			dispatch( push( `/login?redirect=${encodeURI( path )}` ) );
			return;
		}

		dispatch({
			type:      GET_SINGULAR,
			isPreview: true,
			postId:    id,
			promise:   request({
				method: 'get',
				url:    `/wp/v2/${postType}/${id}`,
				params: { preview: 1 }
			})
		});
	};
}
