import React, { PropTypes } from 'react';

export default function CommentReplyLink({ status, onClick }) {
	if ( 'approved' !== status ) {
		return null;
	}

	return (
		<a className="comment-reply-link" onClick={ onClick } rel="nofollow">Reply</a>
	);
}

CommentReplyLink.propTypes = {
	status:  PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};
