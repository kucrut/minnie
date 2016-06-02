import React, { PropTypes } from 'react';
import CommentContent from 'components/Comment/Content';
import CommentAuthor from 'components/Comment/Author';

export default function Comment({ comment }) {
	const {
		author_name: authorName,
		author_avatar_urls: avatarUrls
	} = comment;

	return (
		<li id={ `comment-${comment.id}` } className="comment">
			<article className="comment-body">
				<div className="comment-content">
					<CommentAuthor authorName={ authorName } avatarUrl={ avatarUrls[ '48' ] } />
					<CommentContent content={ comment.content.rendered } />
				</div>
				<div className="comment-metadata">
					<a href={ comment.link }>
						<time dateTime={ comment.date }>{ comment.date }</time>
					</a>
					<span className="reply">
						<a href="#" className="comment-reply-link" rel="nofollow">Reply</a>
					</span>
				</div>
			</article>
		</li>
	);
}

Comment.propTypes = {
	comment: PropTypes.object.isRequired
};
