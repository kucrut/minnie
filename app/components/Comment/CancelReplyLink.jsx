import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function CancelReplyLink({ link }) {
	return (
		<Link
			to={ link }
			id="cancel-comment-reply-link"
			className="genericon genericon-close-alt"
			title="Cancel reply"
			rel="nofollow"
		><span className="screen-reader-text">Cancel reply</span></Link>
	);
}

CancelReplyLink.propTypes = {
	link: PropTypes.string.isRequired
};
