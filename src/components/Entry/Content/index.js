import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closest from 'dom-closest';
import Interweave from 'interweave';
import { withRouter } from 'react-router-dom';

import { contentPathRegEx } from '../../../helpers';
import filters from './filters';
import transformer from './transformer';

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
			<div className={ className }>
				<Interweave
					commonClass={ null }
					content={ content }
					filters={ filters.map( Filter => new Filter() ) }
					tagName="fragment"
					transform={ transformer }
				/>
			</div>
		);
	}
}

export default withRouter( EntryContent );
