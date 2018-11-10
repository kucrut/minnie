import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchComments } from '../../store/actions/comments';
import Spinner from '../Spinner';
import List from './List';

const Wrap = ( { threadId, children } ) => {
	if ( threadId > 0 ) {
		return <div className="children-wrap">{ children }</div>;
	}

	return (
		<div className="comments-area" id="comments">
			<h2 className="comments-title">Comments</h2>
			<div className="comment-list-wrap">
				{ children }
			</div>
		</div>
	);
}

class Comments extends Component {
	componentDidMount() {
		if ( ! this.props.thread ) {
			this.fetch();
		}
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.postId !== prevProps.postId ) {
			this.fetch();
		}
	}

	fetch() {
		const { dispatch, postId, threadId } = this.props;

		dispatch( fetchComments( {
			post: postId,
			parent: threadId,
		} ) );
	}

	render() {
		const {
			isOpen,
			postId,
			thread,
			threadId,
		} = this.props;

		if ( ! thread ) {
			return null;
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

		const list = () => {
			if ( items.length ) {
				const className = threadId > 0 ? 'children' : '';
				// eslint-disable-next-line
				return <List className={ className } { ...{ items, isOpen, postId } } />;
			}

			return null;
		}

		return <Wrap threadId={ threadId }>{ list() }</Wrap>;
	}
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

Comments.defaultProps = defaultProps;
Comments.propTypes = propTypes;

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

export default connect( mapStateToProps )( Comments );
