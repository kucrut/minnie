import React from 'react';
import PropTypes from 'prop-types';

export default function CommentsList( props ) {
	const { thread } = props;
	const { items } = thread;

	return (
		<div className="comment-list-wrap">
			<ol className="comment-list">
				{ items.map( comment => (
					<li key={ comment.id }>
						{ comment.content.rendered }
					</li>
				) ) }
			</ol>
		</div>
	)
}

export const propTypes = {
	isOpen: PropTypes.bool.isRequired,
	postId: PropTypes.number.isRequired,
	thread: PropTypes.shape( {
		currentPage: PropTypes.number.isRequired,
		hasMore: PropTypes.bool.isRequired,
		isFetching: PropTypes.bool.isRequired,
		items: PropTypes.arrayOf( PropTypes.object ).isRequired, // TODO.
		parentId: PropTypes.number.isRequired,
	} ).isRequired,
};

CommentsList.propTypes = propTypes;
