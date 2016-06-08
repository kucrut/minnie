import React, { PropTypes } from 'react';

export default function CancelReplyLink({ onClick }) {
	return (
		<a
			id="cancel-comment-reply-link"
			className="genericon genericon-close-alt"
			title="Cancel reply"
			rel="nofollow"
			onClick={ onClick }
		><span className="screen-reader-text">Cancel reply</span></a>
	);
}

CancelReplyLink.propTypes = {
	onClick: PropTypes.func.isRequired
};
