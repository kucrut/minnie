import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ScreenReaderLink( props ) {
	const { text, ...rest } = props;

	return (
		<Link { ...rest } title={ text }>
			<span className="screen-reader-text">{ text }</span>
		</Link>
	);
}

ScreenReaderLink.propTypes = {
	text: PropTypes.string.isRequired,
};
