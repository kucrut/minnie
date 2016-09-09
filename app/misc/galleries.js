export default function createGallery( el ) {
	const itemEls = el.querySelectorAll( '.gallery-item' );
	let gallery = {
		id:    el.getAttribute( 'id' ),
		items: []
	};
	let showCaption = false;

	for ( let t = 0; t < itemEls.length; ++t ) {
		const itemEl = itemEls[ t ];
		const origImgUrl = itemEl.querySelector( 'a' ).getAttribute( 'href' );
		const imgEl = itemEl.querySelector( 'img' );
		const msrc  = imgEl.getAttribute( 'src' );
		const sizes = imgEl.getAttribute( 'srcset' ).split( ', ' ).slice( -2 );
		const captionEl = itemEl.querySelector( 'figcaption' );
		const item = [];
		let title;

		if ( captionEl ) {
			title = captionEl.innerHTML;
			showCaption = true;
		} else {
			title = '';
		}

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

		gallery.items.push( item );
	}

	gallery = Object.assign({}, gallery, { showCaption });

	return gallery;
}
