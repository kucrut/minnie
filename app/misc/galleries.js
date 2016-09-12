import { sortBy } from 'lodash';
import { hashCode } from 'helpers';

function createGalleryItem( imgEl, origImgUrl, title = '' ) {
	const msrc  = imgEl.getAttribute( 'src' );
	const sizes = imgEl.getAttribute( 'srcset' ).split( ', ' );
	let item = {
		sizes: [],
		title,
		msrc
	};

	for ( let s = 0; s < sizes.length; ++s ) {
		const srcW = sizes[ s ].split( ' ' );
		const src = srcW[ 0 ];
		let size;

		if ( src === origImgUrl ) {
			size = {
				src: origImgUrl,
				w:   parseInt( imgEl.getAttribute( 'data-ow' ), 10 ),
				h:   parseInt( imgEl.getAttribute( 'data-oh' ), 10 )
			};
		} else {
			const w = parseInt( srcW[ 1 ].replace( 'w', '' ), 10 );
			const xPos = src.lastIndexOf( 'x' );
			const dotPos = src.lastIndexOf( '.' );
			const h = parseInt( src.slice( ( xPos + 1 ), dotPos ), 10 );

			size = { src, w, h };
		}

		item = Object.assign({}, item, {
			sizes: item.sizes.concat( size )
		});
	}

	item = Object.assign({}, item, {
		sizes: sortBy( item.sizes, 'w' )
	});

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

		gallery = Object.assign({}, gallery, {
			items: gallery.items.concat( createGalleryItem( imgEl, origImgUrl, title ) )
		});
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

export function prepareGallery( el ) {
	const itemEls = el.querySelectorAll( '.gallery-item' );
	const itemsCount = itemEls.length;

	if ( 6 > itemsCount ) {
		return;
	}

	const anchor = itemEls[ 5 ].querySelector( 'a' );
	const cover = document.createElement( 'span' );

	cover.classList.add( 'cover' );
	el.classList.add( 'has-more' );
	anchor.appendChild( cover );
	anchor.setAttribute( 'data-more', `${itemsCount - 6}` );
}
