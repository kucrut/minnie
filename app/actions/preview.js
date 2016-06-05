import request from 'axios';
import { polyfill } from 'es6-promise';
import { postTypeMap, GET_SINGULAR } from 'constants/index';

polyfill();

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
