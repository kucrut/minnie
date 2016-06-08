import React, { PropTypes } from 'react';

export default function CommentReplyLink({ onClick }) {
	return (
		<a className="comment-reply-link" onClick={ onClick } rel="nofollow">Reply</a>
	);
}

CommentReplyLink.propTypes = {
	onClick: PropTypes.func.isRequired
};
