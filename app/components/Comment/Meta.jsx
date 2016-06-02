import React, { PropTypes } from 'react';

export default function CommentMeta({ date, link }) {
	return (
		<div className="comment-metadata">
			<a href={ link }>
				<time dateTime={ date }>{ date }</time>
			</a>
			<span className="reply">
				<a href="#" className="comment-reply-link" rel="nofollow">Reply</a>
			</span>
		</div>
	);
}

CommentMeta.propTypes = {
	date: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired
};
