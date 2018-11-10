import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchComments } from '../../store/actions/comments';
import Spinner from '../Spinner';
import List from './List';

const Section = ( { children } ) => (
	<div className="comments-area" id="comments">
		<h2 className="comments-title">Comments</h2>
		<div className="comment-list-wrap">
			{ children }
		</div>
	</div>
);

function CommentsList( props ) {
	const {
		dispatch,
		isOpen,
		postId,
		thread,
		threadId,
	} = props;

	if ( ! thread ) {
		dispatch( fetchComments( {
			postId,
			parentId: threadId,
		} ) )
	}

	const { isFetching, items } = thread;

	// We don't want to show the Comments section when
	// - the initial thread is still being fetched,
	// - or there's no comments and comments status is closed.
	if ( threadId === 0 ) {
		if ( isFetching ) {
			return null;
		}

		if ( ! items.length && ! isOpen ) {
			return null;
		}
	}

	// This is only applicable to child threads.
	if ( isFetching ) {
		return <Spinner />;
	}

	const list = () => <List items={ items } />;

	if ( threadId === 0 ) {
		return <Section>{ list() }</Section>;
	}

	return list();
}

export const defaultProps = {
	thread: null,
};

export const propTypes = {
	dispatch: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	postId: PropTypes.number.isRequired,
	threadId: PropTypes.number.isRequired,
	thread: PropTypes.shape( {
		currentPage: PropTypes.number.isRequired,
		hasMore: PropTypes.bool.isRequired,
		isFetching: PropTypes.bool.isRequired,
		items: PropTypes.arrayOf( PropTypes.object ).isRequired, // TODO.
		parentId: PropTypes.number.isRequired,
	} ),
};

CommentsList.defaultProps = defaultProps;
CommentsList.propTypes = propTypes;

const mapStateToProps = ( state, ownProps ) => {
	const { comments } = state;
	const { threads } = comments;
	const { threadId, postId } = ownProps;

	return {
		thread: postId === comments.postId
			? threads.find( thread => thread.parentId === threadId )
			: null,
	};
};

export default connect( mapStateToProps )( CommentsList );
