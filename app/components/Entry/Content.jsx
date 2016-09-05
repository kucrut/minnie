import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import closest from 'dom-closest';
import { contentPathRegEx } from 'helpers';
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

	render() {
		const { content, wrapClass } = this.props;
		let divClass = wrapClass || 'entry-content';

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
