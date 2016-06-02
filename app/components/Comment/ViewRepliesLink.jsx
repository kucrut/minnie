import React, { PropTypes } from 'react';

export default function CommentViewRepliesLink({ count, onClick }) {
	if ( 0 === count ) {
		return null;
	}

	return (
		<a className="comment-view-replies-link" onClick={ onClick }>View replies</a>
	);
}

CommentViewRepliesLink.propTypes = {
	count:   PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired
};
