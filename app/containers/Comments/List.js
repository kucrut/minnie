import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Comment from '../../components/Comment/Item';
import Spinner from '../../components/Spinner';
import LoadMoreButton from '../../components/LoadMoreButton';

export default class CommentsList extends Component {
	static propTypes = {
		maxDepth: PropTypes.number.isRequired,
		depth: PropTypes.number.isRequired,
		comments: PropTypes.object.isRequired,
		parentId: PropTypes.number.isRequired,
		listClass: PropTypes.string.isRequired,
		renderForm: PropTypes.func.isRequired,
		allowReplies: PropTypes.bool.isRequired,
		onClickLoadMore: PropTypes.func.isRequired,
		onClickViewReplies: PropTypes.func.isRequired,
	}

	constructor( props ) {
		super( props );

		this.renderItem = this.renderItem.bind( this );
	}

	getThread() {
		const { parentId, comments } = this.props;

		return comments.threads[ `t${parentId}` ];
	}

	renderReplies( parentId ) {
		const threadId = `t${parentId}`;
		const { maxDepth, allowReplies, comments } =  this.props;
		const { threads } = comments;

		if ( ! ( threadId in threads ) ) {
			return null;
		}

		if ( threads[ threadId ].isFetching ) {
			return ( <Spinner /> );
		}

		const depth = this.props.depth + 1;
		const args  = Object.assign( {}, this.props, {
			allowReplies: ( allowReplies && depth <= maxDepth ),
			listClass: 'children',
			parentId,
			depth,
		} );

		return (
			<CommentsList key="children-comments" { ...args } />
		);
	}

	renderButton() {
		const thread = this.getThread();
		const { hasMore, isFetching, currentPage } = thread;
		const { parentId, onClickLoadMore } = this.props;
		const buttonArgs = {
			hasMore,
			isFetching,
			text: 'Load More Comments',
			onClick: onClickLoadMore,
			params: {
				parent: parentId,
				page: currentPage + 1,
			},
		};

		return (
			<LoadMoreButton { ...buttonArgs } />
		);
	}

	renderItem( comment ) {
		const { allowReplies, renderForm, onClickViewReplies } = this.props;
		const args = {
			key: `comment-${comment.id}`,
			comment,
			allowReplies,
			onClickViewReplies,
		};

		return (
			<Comment { ...args }>
				{ renderForm( comment.id ) }
				{ this.renderReplies( comment.id ) }
			</Comment>
		);
	}

	render() {
		const thread = this.getThread();

		if ( ! thread.items.length ) {
			return null;
		}

		const { listClass } = this.props;

		return (
			<div className={ `${listClass}-wrap` }>
				<ol className={ listClass }>
					{ thread.items.map( this.renderItem ) }
				</ol>

				{ this.renderButton() }
			</div>
		);
	}
}
