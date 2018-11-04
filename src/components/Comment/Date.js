import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CommentDate( { link, date, dateFormatted } ) {
	return (
		<Link to={ link } rel="bookmark" className="comment-date">
			<time dateTime={ date }>{ dateFormatted }</time>
		</Link>
	);
}

CommentDate.propTypes = {
	link: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	dateFormatted: PropTypes.string.isRequired,
};
