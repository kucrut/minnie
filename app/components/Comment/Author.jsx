import React, { PropTypes } from 'react';

// TODO: Wrap with link if applicable.
export default function CommentAuthor({ authorName }) {
	return (
		<span><b className="fn">{ authorName }</b> <span className="says">says:</span></span>
	);
}

CommentAuthor.propTypes = {
	authorName: PropTypes.string.isRequired
};
