import React, { PropTypes } from 'react';
import CommentsList from 'containers/Comments/List';

export default function Comments( comments ) {
	return (
		<div className="comments-area" id="comments">
			<h2 className="comments-title">Comments</h2>

			<CommentsList items={ comments.items } listClass="comment-list" />
		</div>
	);
}

Comments.propTypes = {
	comments: PropTypes.object.isRequired
};
