import React, { PropTypes } from 'react';

export default function CommentAuthor({ authorName, avatarUrl }) {
	return (
		<footer className="comment-meta">
			<div className="comment-author vcard">
				<img className="avatar"src={ avatarUrl } alt={ `${authorName}'s avatar` } />
				<b className="fn">{ authorName }</b>
				<span className="says">says:</span>
			</div>
		</footer>
	);
}

CommentAuthor.propTypes = {
	authorName: PropTypes.string.isRequired,
	avatarUrl:  PropTypes.string.isRequired
};
