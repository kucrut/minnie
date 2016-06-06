import React, { Component, PropTypes } from 'react';
import Comment from 'components/Comment/Item';
import Spinner from 'components/Spinner';
import LoadMoreButton from 'components/LoadMoreButton';

export default class CommentsList extends Component {
	static propTypes = {
		comments:           PropTypes.object.isRequired,
		parentId:           PropTypes.number.isRequired,
		listClass:          PropTypes.string.isRequired,
		onClickReply:       PropTypes.func.isRequired,
		onClickLoadMore:    PropTypes.func.isRequired,
		onClickViewReplies: PropTypes.func.isRequired
	}

	getThread() {
		const { parentId, comments } = this.props;

		return comments.threads[ `t${parentId}` ];
	}

	renderReplies( parentId ) {
		const threadId = `t${parentId}`;
		const { threads } = this.props.comments;

		if ( ! ( threadId in threads ) ) {
			return null;
		}

		if ( threads[ threadId ].isFetching ) {
			return ( <Spinner /> );
		}

		const args = Object.assign({}, this.props, {
			parentId,
			listClass: 'children'
		});

		return (
			<CommentsList { ...args } />
		);
	}

	renderButton() {
		const thread = this.getThread();
		const { hasMore, isFetching, currentPage } = thread;
		const { parentId, onClickLoadMore } = this.props;
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
			<LoadMoreButton { ...buttonArgs } />
		);
	}

	render() {
		const { listClass, ...rest } = this.props;
		const thread = this.getThread();

		if ( ! thread.items.length ) {
			return null;
		}

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

				{ this.renderButton() }
			</div>
		);
	}
}
