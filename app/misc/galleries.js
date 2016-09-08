export default function createGallery( el ) {
	const itemEls = el.querySelectorAll( '.gallery-item' );
	const gallery = {
		id:    el.getAttribute( 'id' ),
		items: []
	};

	for ( let t = 0; t < itemEls.length; ++t ) {
		const itemEl = itemEls[ t ];
		const origImgUrl = itemEl.querySelector( 'a' ).getAttribute( 'href' );
		const imgEl = itemEl.querySelector( 'img' );
		const msrc  = imgEl.getAttribute( 'src' );
		const sizes = imgEl.getAttribute( 'srcset' ).split( ', ' ).slice( -2 );
		const item = [];

		for ( let s = 0; s < sizes.length; ++s ) {
			const srcW = sizes[ s ].split( ' ' );
			const src = srcW[ 0 ];

			if ( src === origImgUrl ) {
				item.push({
					src: origImgUrl,
					w:   imgEl.getAttribute( 'data-ow' ),
					h:   imgEl.getAttribute( 'data-oh' ),
					msrc
				});

				continue;
			}

			const w = srcW[ 1 ].replace( 'w', '' );
			const xPos = src.lastIndexOf( 'x' );
			const dotPos = src.lastIndexOf( '.' );
			const h = src.slice( ( xPos + 1 ), dotPos );

			item.push({ msrc, src, w, h });
		}

		gallery.items.push( item );
	}

	return gallery;
}
