import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closest from 'dom-closest';
import { withRouter } from 'react-router-dom';

import { contentPathRegEx } from '../../helpers';

class EntryContent extends Component {
	static defaultProps = {
		className: 'entry-content',
	};

	static propTypes = {
		content: PropTypes.string.isRequired,
		className: PropTypes.string,
	};

	handleClick( e ) {
		const { history } = this.props;
		const anchor = closest( e.target, 'a' );

		if ( ! anchor ) {
			return;
		}

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
