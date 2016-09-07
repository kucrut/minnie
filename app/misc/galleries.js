export default function findGalleries( el ) {
	let galleries = [];
	const galleryEls = el.querySelectorAll( 'div.gallery' );

	if ( ! galleryEls.length ) {
		return galleries;
	}

	for ( let g = 0; g < galleryEls.length; ++g ) {
		const galleryEl = galleryEls[ g ];
		const id = galleryEl.getAttribute( 'id' );
		const itemEls = galleryEl.querySelectorAll( '.gallery-item' );
		let gallery = { id, items: [] };

		for ( let t = 0; t < itemEls.length; ++t ) {
			const itemEl = itemEls[ t ];
			const img = itemEl.querySelector( 'img' );
			const item = {
				src: itemEl.querySelector( 'a' ).getAttribute( 'href' ),
				w:   parseInt( img.getAttribute( 'width' ), 10 ),
				h:   parseInt( img.getAttribute( 'height' ), 10 )
			};

			gallery = Object.assign({}, gallery, {
				items: gallery.items.concat( item )
			});
		}

		galleries = galleries.concat( gallery );
	}

	return galleries;
}
