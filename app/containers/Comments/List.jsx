import React, { Component, PropTypes } from 'react';
import Comment from 'components/Comment/Item';
import LoadMoreButton from 'components/LoadMoreButton';

// TODO: Wrap list and append load more button.
export default class CommentsList extends Component {
	static propTypes = {
		comments:           PropTypes.object.isRequired,
		parentId:           PropTypes.number.isRequired,
		listClass:          PropTypes.string.isRequired,
		onClickReply:       PropTypes.func.isRequired,
		onClickLoadMore:    PropTypes.func.isRequired,
		onClickViewReplies: PropTypes.func.isRequired
	}

	renderReplies( parentId ) {
		if ( ! ( `t${parentId}` in this.props.comments.threads ) ) {
			return null;
		}

		const repliesArgs = Object.assign({}, this.props, {
			parentId,
			listClass: 'children'
		});

		return (
			<CommentsList { ...repliesArgs } />
		);
	}

	render() {
		const { listClass, parentId, comments, onClickLoadMore, ...rest } = this.props;
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
						const args = {
							key: `comment-${comment.id}`,
							comment,
							...rest
						};

						return (
							<Comment { ...args }>
								{ this.renderReplies( comment.id ) }
							</Comment>
						);
					}) }
				</ol>

				<LoadMoreButton { ...buttonArgs } />
			</div>
		);
	}
}
