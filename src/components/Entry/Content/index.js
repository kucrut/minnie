import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Interweave from 'interweave';

import transformer from './transformer';

export default class EntryContent extends Component {
	static defaultProps = {
		className: 'entry-content',
	};

	static propTypes = {
		content: PropTypes.string.isRequired,
		className: PropTypes.string,
	};

	render() {
		const { content, className } = this.props;

		return (
			<Interweave
				className={ className }
				commonClass={ null }
				content={ content }
				tagName="div"
				transform={ transformer }
			/>
		);
	}
}
