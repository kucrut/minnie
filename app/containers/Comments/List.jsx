import React, { PropTypes } from 'react';
import Comment from 'components/Comment/Item';
import LoadMoreButton from 'components/LoadMoreButton';

// TODO: Wrap list and append load more button.
export default function CommentsList( props ) {
	const { listClass, parentId, comments, onClickLoadMore, ...rest } = props;
	const thread = comments.threads[ `t${parentId}` ];

	if ( ! thread.items.length ) {
		return null;
	}

	const { hasMore, isFetching, currentPage } = thread;
	const buttonArgs = {
		hasMore,
		isFetching,
		text:    'Load More Comments',
		onClick: onClickLoadMore,
		params:  {
			parent: parentId,
			page:   currentPage + 1
		},
	};

	return (
		<div className={ `${listClass}-wrap` }>
			<ol className={ listClass }>
				{ thread.items.map( comment => {
					const childThreadId = `t${comment.id}`;

					let repliesEl;
					let repliesArgs;
					let args = {
						key: `comment-${comment.id}`,
						comment,
						...rest
					};

					if ( childThreadId in comments.threads ) {
						repliesArgs = Object.assign({}, props, {
							parentId:  comment.id,
							listClass: 'children'
						});
						repliesEl = ( <CommentsList { ...repliesArgs } /> );
						args = Object.assign({}, args, { repliesEl });
					}

					return ( <Comment { ...args } /> );
				}) }
			</ol>

			<LoadMoreButton { ...buttonArgs } />
		</div>
	);
}

CommentsList.propTypes = {
	comments:           PropTypes.object.isRequired,
	parentId:           PropTypes.number.isRequired,
	listClass:          PropTypes.string.isRequired,
	onClickReply:       PropTypes.func.isRequired,
	onClickLoadMore:    PropTypes.func.isRequired,
	onClickViewReplies: PropTypes.func.isRequired
};
