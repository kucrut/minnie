import { hashCode } from 'helpers';

function createGalleryItem( imgEl, origImgUrl, title = '' ) {
	const msrc  = imgEl.getAttribute( 'src' );
	const sizes = imgEl.getAttribute( 'srcset' ).split( ', ' ).slice( -2 );
	const item = [];

	for ( let s = 0; s < sizes.length; ++s ) {
		const srcW = sizes[ s ].split( ' ' );
		const src = srcW[ 0 ];
		const size = title ? { title } : {};

		if ( src === origImgUrl ) {
			item.push( Object.assign( size, {
				src: origImgUrl,
				w:   imgEl.getAttribute( 'data-ow' ),
				h:   imgEl.getAttribute( 'data-oh' ),
				msrc
			}) );

			continue;
		}

		const w = srcW[ 1 ].replace( 'w', '' );
		const xPos = src.lastIndexOf( 'x' );
		const dotPos = src.lastIndexOf( '.' );
		const h = src.slice( ( xPos + 1 ), dotPos );

		item.push( Object.assign( size, { msrc, src, w, h }) );
	}

	return item;
}

export function createGallery( el ) {
	const itemEls = el.querySelectorAll( '.gallery-item' );
	let gallery = {
		id:     el.getAttribute( 'id' ),
		items:  [],
		single: false
	};
	let showCaption = false;

	for ( let i = 0; i < itemEls.length; ++i ) {
		const itemEl = itemEls[ i ];
		const captionEl = itemEl.querySelector( 'figcaption' );
		const origImgUrl = itemEl.querySelector( 'a' ).getAttribute( 'href' );
		const imgEl = itemEl.querySelector( 'img' );
		let title;

		if ( captionEl ) {
			title = captionEl.innerHTML;
			showCaption = true;
		} else {
			title = '';
		}

		gallery.items.push( createGalleryItem( imgEl, origImgUrl, title ) );
	}

	gallery = Object.assign({}, gallery, { showCaption });

	return gallery;
}

export function getZoomId( imgEl ) {
	return `gallery-${hashCode( imgEl.parentNode.getAttribute( 'href' ) )}`;
}

export function createZoom( imgEl ) {
	const anchorEl = imgEl.parentNode;
	const captionEl = anchorEl.parentNode.querySelector( '.wp-caption-text' );
	const origImgUrl = anchorEl.getAttribute( 'href' );
	const title = captionEl ? captionEl.innerHTML : '';
	const item = createGalleryItem( imgEl, origImgUrl, title );

	return {
		id:          getZoomId( imgEl ),
		items:       [item],
		single:      true,
		showCaption: ( '' !== title )
	};
}
