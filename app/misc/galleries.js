export default function findGalleries( el ) {
	let galleries = [];
	const galleryEls = el.querySelectorAll( 'div.gallery' );

	if ( ! galleryEls.length ) {
		return galleries;
	}

	for ( let g = 0; g < galleryEls.length; ++g ) {
		const galleryEl = galleryEls[ g ];
		const itemEls = galleryEl.querySelectorAll( '.gallery-item' );
		const gallery = {
			id:    galleryEl.getAttribute( 'id' ),
			items: []
		};

		for ( let t = 0; t < itemEls.length; ++t ) {
			const itemEl = itemEls[ t ];
			const origImgUrl = itemEl.querySelector( 'a' ).getAttribute( 'href' );
			const img = itemEl.querySelector( 'img' );
			const sizes = img.getAttribute( 'srcset' ).split( ', ' ).slice( -2 );
			const item = [];

			for ( let s = 0; s < sizes.length; ++s ) {
				const srcW = sizes[ s ].split( ' ' );
				const src = srcW[ 0 ];

				if ( src === origImgUrl ) {
					item.push({
						src: origImgUrl,
						w:   img.getAttribute( 'data-ow' ),
						h:   img.getAttribute( 'data-oh' )
					});

					continue;
				}

				const w = srcW[ 1 ].replace( 'w', '' );
				const xPos = src.lastIndexOf( 'x' );
				const dotPos = src.lastIndexOf( '.' );
				const h = src.slice( ( xPos + 1 ), dotPos );

				item.push({ src, w, h });
			}

			gallery.items.push( item );
		}

		galleries = galleries.concat( gallery );
	}

	return galleries;
}
