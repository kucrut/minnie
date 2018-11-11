import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Interweave from 'interweave';

import { AppContext } from '../../contexts';
import transformer from './transformer';

export default class Content extends Component {
	static contextType = AppContext;

	static propTypes = {
		content: PropTypes.string.isRequired,
	};

	render() {
		const { isServer, siteUrl } = this.context;
		const { content } = this.props;

		if ( isServer ) {
			return <div dangerouslySetInnerHTML={ { __html: content } } />
		}

		return (
			<Interweave
				content={ content }
				tagName="div"
				transform={ ( ...args ) => transformer( siteUrl, ...args ) }
			/>
		);
	}
}
