// TODO: Move gallery & code higlight handlers out.

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closest from 'dom-closest';
import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

import { contentPathRegEx } from '../../helpers';
/*
import { openGallery, zoomImage } from '../../store/actions/galleries';
import highlightCode from '../../misc/highlight';
import { prepareGallery } from '../../misc/galleries';
*/

class EntryContent extends Component {
	static defaultProps = {
		className: 'entry-content',
	};

	static propTypes = {
		content: PropTypes.string.isRequired,
		className: PropTypes.string,
		// dispatch: PropTypes.func.isRequired,
	};

	/*
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
	*/

	handleClick( e ) {
		const { history } = this.props;
		const anchor = closest( e.target, 'a' );

		if ( ! anchor ) {
			return;
		}

		// Initialize Photoswipe for image gallery.
		/*
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
		*/

		// Don't bother if this is an external link.
		if ( anchor.hostname !== window.location.hostname ) {
			return;
		}

		// Don't bother if this is a link to an attachment file.
		if ( contentPathRegEx.test( anchor.pathname ) ) {
			return;
		}

		e.preventDefault();
		history.push( anchor.pathname );
	}

	render() {
		const { content, className } = this.props;

		return (
			<div
				ref={ c => this.theContent = c }
				className={ className }
				dangerouslySetInnerHTML={ { __html: content } }
				onClick={ e => this.handleClick( e ) }
			/>
		);
	}
}

export default withRouter( EntryContent );
