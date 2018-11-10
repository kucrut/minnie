import React from 'react';

export default function ViewRepliesButton( props ) {
	const { children, ...rest } = props;

	return (
		<button
			className="comment-view-replies-link genericon genericon-downarrow"
			{ ...rest }
		>
			View Replies
		</button>
	);
}
