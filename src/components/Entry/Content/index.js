import React from 'react';
import PropTypes from 'prop-types';
import Interweave from 'interweave';

import transformer from './transformer';

export default function EntryContent( props ) {
	const { content, className } = props;

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

EntryContent.defaultProps = {
	className: 'entry-content',
};

EntryContent.propTypes = {
	content: PropTypes.string.isRequired,
	className: PropTypes.string,
};
