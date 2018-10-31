import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
