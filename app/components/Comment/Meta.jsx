import React, { PropTypes } from 'react';

export default function CommentMeta( props ) {
	const {
		link,
		date,
		dateFormatted,
		handleViewReplies
	} = props;

	return (
		<div className="comment-metadata">
			<a href={ link }>
				<time dateTime={ date }>{ dateFormatted }</time>
			</a>
			<a className="comment-view-replies-link" onClick={ handleViewReplies }>View replies</a>
			<span className="reply">
				<a href="#" className="comment-reply-link" rel="nofollow">Reply</a>
			</span>
		</div>
	);
}

CommentMeta.propTypes = {
	date:              PropTypes.string.isRequired,
	link:              PropTypes.string.isRequired,
	dateFormatted:     PropTypes.string.isRequired,
	handleViewReplies: PropTypes.func.isRequired
};
