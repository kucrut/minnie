import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Comments() {
	return (
		<div className="comments-area" id="comments">
			<h2 className="comments-title">Comments</h2>
		</div>
	);
}

Comments.propTypes = {
	dispatch: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	maxDepth: PropTypes.number.isRequired,
	postId: PropTypes.number.isRequired,
	thread: PropTypes.object.isRequired,
	threadId: PropTypes.number.isRequired,
};

const mapStateToProps = ( state, ownProps ) => {
	const { info, comments, singular } = state;
	const { data } = singular;
	const { comment_status, id } = data;
	const { settings } = info;
	const { comments: commentsSettings } = settings;
	const { threads_depth } = commentsSettings;
	const { threadId } = ownProps;
	const { threads } = comments;

	return {
		isOpen: comment_status === 'open',
		maxDepth: threads_depth,
		postId: id,
		thread: id === comments.postId
			? threads.find( thread => thread.parentId === threadId )
			: {},
	};
};

export default connect( mapStateToProps )( Comments );
