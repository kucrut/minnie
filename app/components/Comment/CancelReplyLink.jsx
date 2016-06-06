import React, { PropTypes } from 'react';

export default function CancelReplyLink({ onClick }) {
	return (
		<small>
			<a id="cancel-comment-reply-link" rel="nofollow" onClick={ onClick }>Cancel reply</a>
		</small>
	);
}

CancelReplyLink.propTypes = {
	onClick: PropTypes.func.isRequired
};
