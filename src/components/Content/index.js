import React, { Component, Fragment } from 'react';
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
		const { isServer } = this.context;
		const { content } = this.props;

		if ( isServer ) {
			return (
				<Fragment dangerouslySetInnerHTML={ { __html: content } } />
			);
		}

		return (
			<Interweave
				commonClass={ null }
				content={ content }
				tagName="fragment"
				transform={ transformer }
			/>
		);
	}
}
