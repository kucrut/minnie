import React, { PropTypes } from 'react';

export default function CommentViewRepliesLink({ onClick }) {
	return (
		<div className="comment-metadata">
			<a className="comment-view-replies-link" onClick={ onClick }>View replies</a>
		</div>
	);
}

CommentViewRepliesLink.propTypes = {
	onClick: PropTypes.func.isRequired
};
