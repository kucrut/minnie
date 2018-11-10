import React from 'react';
import PropTypes from 'prop-types';

import Content from '../../Content';

function Item( props ) {
	const { id, content } = props;

	return (
		<li key={ id }>
			<Content
				className="comment-content"
				content={ content.rendered }
			/>
		</li>
	);
}

function List( props ) {
	const { createItem, items } = props;

	return (
		<ol className="comment-list">
			{ items.map( comment => createItem( comment ) ) }
		</ol>
	);
}

export default function CommentsList( props ) {
	const { thread } = props;
	const { items } = thread;

	return (
		<div className="comment-list-wrap">
			<List items={ items } createItem={ Item } />
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
