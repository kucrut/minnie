import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import closest from 'dom-closest';
import { forEach } from 'lodash';
import { contentPathRegEx } from 'helpers';
import { openGallery, zoomImage } from 'actions/galleries';
import highlightCode from 'misc/highlight';

class EntryContent extends Component {
	static propTypes = {
		content:   PropTypes.string.isRequired,
		wrapClass: PropTypes.string,
		dispatch:  PropTypes.func.isRequired
	}

	constructor( props ) {
		super( props );
		this.handleClick = this.handleClick.bind( this );
	}

	componentDidMount() {
		highlightCode( this.theContent );
		this.prepareGalleries();
	}

	prepareGalleries() {
		const galleryEls = this.theContent.querySelectorAll( '.gallery' );

		if ( ! galleryEls.length ) {
			return;
		}

		forEach( galleryEls, el => {
			const itemEls = el.querySelectorAll( '.gallery-item' );
			const itemsCount = itemEls.length;

			if ( 6 < itemsCount ) {
				el.classList.add( 'has-more' );
				itemEls[ 5 ].querySelector( 'a' ).setAttribute( 'data-more', itemsCount - 6 );
			}
		});
	}

	handleClick( e ) {
		const { dispatch } = this.props;
		const anchor = closest( e.target, 'a' );

		if ( ! anchor ) {
			return;
		}

		// Initialize Photoswipe for image gallery.
		const galleryItem = closest( anchor, '.gallery-item' );
		if ( galleryItem ) {
			e.preventDefault();
			dispatch( openGallery( galleryItem ) );

			return;
		}

		// Zoom image using Photoswipe.
		const imgEl = anchor.querySelector( 'img' );
		if ( imgEl && '1' === anchor.getAttribute( 'data-zoom' ) ) {
			e.preventDefault();
			dispatch( zoomImage( imgEl ) );

			return;
		}

		// Don't bother if this is an external link
		if ( anchor.hostname !== location.hostname ) {
			return;
		}

		// Don't bother if this is a link to an attachment file other than images.
		if ( contentPathRegEx.test( anchor.pathname ) ) {
			return;
		}

		e.preventDefault();
		dispatch( push( anchor.pathname ) );
	}

	render() {
		const { content, wrapClass } = this.props;
		const divClass = wrapClass || 'entry-content';

		return (
			<div
				ref={ ( c ) => { this.theContent = c; } }
				className={ divClass }
				onClick={ this.handleClick }
				dangerouslySetInnerHTML={ { __html: content } }
			/>
		);
	}
}

export default connect()( EntryContent );
