import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import closest from 'dom-closest';
import { forEach } from 'lodash';

import { contentPathRegEx } from '../../helpers';
import { openGallery, zoomImage } from '../../actions/galleries';
import highlightCode from '../../misc/highlight';
import { prepareGallery } from '../.../misc/galleries';

class EntryContent extends Component {
	static propTypes = {
		content: PropTypes.string.isRequired,
		wrapClass: PropTypes.string,
		dispatch: PropTypes.func.isRequired,
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

		forEach( galleryEls, prepareGallery );
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
		if ( imgEl && anchor.getAttribute( 'data-zoom' ) === '1' ) {
			e.preventDefault();
			dispatch( zoomImage( imgEl ) );

			return;
		}

		// Don't bother if this is an external link
		if ( anchor.hostname !== window.location.hostname ) {
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
				ref={ c => {
					this.theContent = c;
				} }
				className={ divClass }
				onClick={ this.handleClick }
				dangerouslySetInnerHTML={ { __html: content } }
			/>
		);
	}
}

export default connect()( EntryContent );
