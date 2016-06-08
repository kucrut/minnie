import React, { PropTypes } from 'react';

export default function CommentReplyLink({ onClick }) {
	const cls = 'comment-reply-link genericon genericon-reply-single';

	return (
		<a className={ cls } onClick={ onClick } rel="nofollow" title="Reply">
			<span className="screen-reader-text">Reply</span>
		</a>
	);
}

CommentReplyLink.propTypes = {
	onClick: PropTypes.func.isRequired
};
