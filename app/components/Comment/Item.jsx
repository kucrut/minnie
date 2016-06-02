import React, { PropTypes } from 'react';
import CommentContent from 'components/Comment/Content';
import CommentAuthor from 'components/Comment/Author';
import CommentMeta from 'components/Comment/Meta';

export default function Comment({ comment }) {
	const {
		date,
		link,
		date_formatted: dateFormatted,
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
				<CommentMeta date={ date } link={ link } dateFormatted={ dateFormatted } />
			</article>
		</li>
	);
}

Comment.propTypes = {
	comment: PropTypes.object.isRequired
};
