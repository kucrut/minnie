import React from 'react';
import PropTypes from 'prop-types';

import ListWrap from '../ListWrap';
import Item from '../Item';

export default function CommentsList( props ) {
	const { thread } = props;
	const { items } = thread;

	return (
		<div className="comment-list-wrap">
			<ListWrap items={ items } createItem={ Item } />
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
