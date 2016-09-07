export default function findGalleries( el ) {
	let galleries = [];
	const galleryEls = el.querySelectorAll( 'div.gallery' );

	if ( ! galleryEls.length ) {
		return galleries;
	}

	for ( let g = 0; g < galleryEls.length; ++g ) {
		const galleryEl = galleryEls[ g ];
		const itemEls = galleryEl.querySelectorAll( '.gallery-item' );
		let gallery = {
			id:    galleryEl.getAttribute( 'id' ),
			items: []
		};

		// TODO: Make responsive.
		for ( let t = 0; t < itemEls.length; ++t ) {
			const itemEl = itemEls[ t ];
			const item = {
				src: itemEl.querySelector( 'a' ).getAttribute( 'href' ),
				w:   2000,
				h:   1500
			};

			gallery = Object.assign({}, gallery, {
				items: gallery.items.concat( item )
			});
		}

		galleries = galleries.concat( gallery );
	}

	return galleries;
}
