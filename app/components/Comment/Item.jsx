import React, { PropTypes } from 'react';
import CommentContent from 'components/Comment/Content';

export default function Comment({ comment }) {
	return (
		<li id={ `comment-${comment.id}` } className="comment">
			<article className="comment-body">
				<div className="comment-content">
					<footer className="comment-meta">
						<div className="comment-author vcard">
							<img
								className="avatar"
								src={ comment.author_avatar_urls[ '48' ] }
								alt={ `${comment.author_name}'s avatar` }
							/>
							<b className="fn">{ comment.author_name }</b>
							<span className="says">says:</span>
						</div>
					</footer>

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
