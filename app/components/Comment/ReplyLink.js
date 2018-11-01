import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default function CommentReplyLink( { link } ) {
	const cls = 'comment-reply-link genericon genericon-reply-single';

	return (
		<Link to={ link } className={ cls } rel="nofollow" title="Reply">
			<span className="screen-reader-text">Reply</span>
		</Link>
	);
}

CommentReplyLink.propTypes = { link: PropTypes.string.isRequired };
