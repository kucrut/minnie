import React, { PropTypes } from 'react';

export default function CommentViewRepliesLink({ onClick }) {
	const cls = 'comment-view-replies-link genericon genericon-downarrow';

	return (
		<a className={ cls } onClick={ onClick } title="View replies">
			<span className="screen-reader-text">View replies</span>
		</a>
	);
}

CommentViewRepliesLink.propTypes = {
	onClick: PropTypes.func.isRequired
};
