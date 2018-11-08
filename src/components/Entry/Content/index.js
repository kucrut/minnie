import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Interweave from 'interweave';
import { withRouter } from 'react-router-dom';

import transformer from './transformer';

class EntryContent extends Component {
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

export default withRouter( EntryContent );
