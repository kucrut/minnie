import React, { PropTypes } from 'react';

export default function CommentFooter({ authorName, avatarUrl }) {
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

CommentFooter.propTypes = {
	authorName: PropTypes.string.isRequired,
	avatarUrl:  PropTypes.string.isRequired
};
