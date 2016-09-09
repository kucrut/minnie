import {
	GALLERY_ADD,
	GALLERY_RESET,
	GALLERY_OPEN,
	GALLERY_CLOSE
} from 'constants/index';
import closest from 'dom-closest';
import { find, indexOf } from 'lodash';
import { createGallery, getZoomId, createZoom } from 'misc/galleries';

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

	return ( dispatch, getState ) => {
		const { galleries } = getState();
		let group = find( galleries.groups, { id: galleryId });

		if ( ! group ) {
			group = createGallery( galleryEl );

			dispatch( addGallery( group ) );
		}

		const allItems = galleryEl.querySelectorAll( '.gallery-item' );
		const itemIndex = indexOf( allItems, itemEl );

		dispatch({
			type:  GALLERY_OPEN,
			id:    galleryId,
			index: itemIndex,
			thumb: itemEl
		});
	};
}

export function zoomImage( imgEl ) {
	const zoomId = getZoomId( imgEl );

	return ( dispatch, getState ) => {
		const { galleries } = getState();
		let zoom = find( galleries.groups, { id: zoomId });

		if ( ! zoom ) {
			zoom = createZoom( imgEl );

			dispatch( addGallery( zoom ) );
		}

		dispatch({
			type:  GALLERY_OPEN,
			id:    zoomId,
			index: 0,
			thumb: imgEl.parentNode
		});
	};
}

export function closeGallery() {
	return dispatch => {
		dispatch({ type: GALLERY_CLOSE });
	};
}
