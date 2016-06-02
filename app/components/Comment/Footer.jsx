import React, { PropTypes } from 'react';
import CommentAuthor from 'components/Comment/Author';

export default function CommentFooter({ authorName, avatarUrl }) {
	return (
		<footer className="comment-meta">
			<div className="comment-author vcard">
				<img className="avatar"src={ avatarUrl } alt={ `${authorName}'s avatar` } />
				<CommentAuthor authorName={ authorName } />
			</div>
		</footer>
	);
}

CommentFooter.propTypes = {
	authorName: PropTypes.string.isRequired,
	avatarUrl:  PropTypes.string.isRequired
};
