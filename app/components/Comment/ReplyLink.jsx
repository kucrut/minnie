import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function CommentReplyLink({ link, onClick }) {
	const cls = 'comment-reply-link genericon genericon-reply-single';

	return (
		<Link to={ link } className={ cls } onClick={ onClick } rel="nofollow" title="Reply">
			<span className="screen-reader-text">Reply</span>
		</Link>
	);
}

CommentReplyLink.propTypes = {
	link:    PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};
