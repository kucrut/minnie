import {
	GALLERY_ADD,
	GALLERY_RESET,
	GALLERY_OPEN,
	GALLERY_CLOSE
} from 'constants/index';
import closest from 'dom-closest';

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

export function openGallery( itemEl ) {
	const galleryEl = closest( itemEl, 'div.gallery' );
	const galleryId = galleryEl.getAttribute( 'id' );
	const allItems = galleryEl.querySelectorAll( '.gallery-item' );
	const itemIndex = Array.prototype.indexOf.call( allItems, itemEl );

	return dispatch => {
		dispatch({
			type:  GALLERY_OPEN,
			id:    galleryId,
			index: itemIndex
		});
	};
}

export function closeGallery() {
	return dispatch => {
		dispatch({ type: GALLERY_CLOSE });
	};
}
