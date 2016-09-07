import { GALLERY_ADD, GALLERY_RESET } from 'constants/index';

export function resetGallery() {
	return dispatch => {
		dispatch({ type: GALLERY_RESET });
	};
}

export function addGallery( gallery ) {
	return dispatch => {
		dispatch({
			type: GALLERY_ADD,
			gallery
		});
	};
}
