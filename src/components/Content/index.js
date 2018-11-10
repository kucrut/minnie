import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Interweave from 'interweave';

import { AppContext } from '../../contexts';
import transformer from './transformer';

export default class Content extends Component {
	static contextType = AppContext;

	static defaultProps = {
		className: 'entry-content',
	};

	static propTypes = {
		content: PropTypes.string.isRequired,
		className: PropTypes.string,
	};

	render() {
		const { isServer } = this.context;
		const { content, className } = this.props;

		if ( isServer ) {
			return (
				<div
					className={ className }
					dangerouslySetInnerHTML={ { __html: content } }
				/>
			);
		}

		return (
			<div className={ className }>
				<Interweave
					commonClass={ null }
					content={ content }
					tagName="fragment"
					transform={ transformer }
				/>
			</div>
		);
	}
}
