import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function EntryDate( props ) {
	const {
		link,
		date,
		modified,
		dateFormatted,
		modifiedFormatted,
	} = props;

	return (
		<span className="posted-on">
			<Link to={ link } rel="bookmark">
				<time className="entry-date published" dateTime={ date }>{ dateFormatted }</time>
				<time className="updated" dateTime={ modified }>{ modifiedFormatted }</time>
			</Link>
		</span>
	);
}

EntryDate.propTypes = {
	date: PropTypes.string.isRequired,
	dateFormatted: PropTypes.string.isRequired,
	modified: PropTypes.string.isRequired,
	modifiedFormatted: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
};
