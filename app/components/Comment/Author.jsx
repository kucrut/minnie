import React, { PropTypes } from 'react';

// TODO: Wrap with link if applicable.
export default function CommentAuthor({ authorName }) {
	return (
		<b className="fn">{ authorName }</b>
	);
}

CommentAuthor.propTypes = {
	authorName: PropTypes.string.isRequired
};
