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
	threadId: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
	const { info, singular } = state;
	const { data } = singular;
	const { comment_status, id } = data;
	const { settings } = info;
	const { comments } = settings;
	const { threads_depth } = comments;

	return {
		isOpen: comment_status === 'open',
		maxDepth: threads_depth,
		postId: id,
	};
};

export default connect( mapStateToProps )( Comments );
