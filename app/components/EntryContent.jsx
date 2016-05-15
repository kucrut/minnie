/* eslint global-require: 0 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { contentPathRegEx } from 'helpers';
import closest from 'dom-closest';

// Feels hacky ;-)
import Prism from 'prismjs';
import { codeHighlight } from 'config';
require( 'prismjs/plugins/line-numbers/prism-line-numbers.js' );
codeHighlight.languages.forEach( lang => {
	require( `prismjs/components/prism-${lang}.js` );
});


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
		this.highlightCode();
	}

	handleClick( e ) {
		const anchor = closest( e.target, 'a' );

		if ( ! anchor ) {
			return;
		}

		if ( anchor.hostname !== location.hostname ) {
			return;
		}

		if ( contentPathRegEx.test( anchor.pathname ) ) {
			return;
		}

		e.preventDefault();
		this.props.dispatch( push( anchor.pathname ) );
	}

	highlightCode() {
		const blocks = this.refs.theContent.querySelectorAll( 'pre code' );

		if ( ! blocks.length ) {
			return;
		}

		for ( const block of blocks ) {
			block.parentElement.classList.add( 'line-numbers' );
			Prism.highlightElement( block );
		}
	}

	render() {
		const { content, wrapClass } = this.props;
		let divClass = wrapClass || 'entry-content';

		return (
			<div
				ref="theContent"
				className={ divClass }
				onClick={ this.handleClick }
				dangerouslySetInnerHTML={ { __html: content } }
			/>
		);
	}
}

export default connect()( EntryContent );
