import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { decode } from 'he';

export default function EntryTitle( props ) {
	const { link, title } = props;
	const text = decode( title );

	return (
		<h1 className="entry-title">
			{ link ? <Link to={ link }>{ text }</Link> : text }
		</h1>
	);
}

EntryTitle.defaultProps = {
	link: '',
};

EntryTitle.propTypes = {
	title: PropTypes.string.isRequired,
	link: PropTypes.string,
};
