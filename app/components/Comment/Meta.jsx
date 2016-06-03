import React, { PropTypes } from 'react';
import CommentAuthor from 'components/Comment/Author';
import CommentDate from 'components/Comment/Date';

export default function CommentMeta( props ) {
	const { authorUrl, authorName, avatarUrl, link, date, dateFormatted } =  props;

	return (
		<footer className="comment-meta">
			<div className="comment-author vcard">
				<img className="avatar"src={ avatarUrl } alt={ `${authorName}'s avatar` } />
				<CommentAuthor authorName={ authorName } authorUrl={ authorUrl } />
				<CommentDate link={ link } date={ date } dateFormatted={ dateFormatted } />
			</div>
		</footer>
	);
}

CommentMeta.propTypes = {
	link:          PropTypes.string.isRequired,
	date:          PropTypes.string.isRequired,
	avatarUrl:     PropTypes.string.isRequired,
	authorUrl:     PropTypes.string.isRequired,
	authorName:    PropTypes.string.isRequired,
	dateFormatted: PropTypes.string.isRequired
};
