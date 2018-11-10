import React from 'react';
import PropTypes from 'prop-types';

import CommentsList, { propTypes } from './List';

export default function Comments( props ) {
	const { isOpen, thread } = props;

	if ( ! isOpen && ! thread ) {
		return null;
	}

	return (
		<div className="comments-area" id="comments">
			<h2 className="comments-title">Comments</h2>
			{ thread ? <CommentsList { ...props } /> : null }
		</div>
	);
}

Comments.defaultProps = {
	thread: null,
};

Comments.propTypes = {
	...propTypes,
	thread: PropTypes.object,
};
