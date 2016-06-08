import React, { PropTypes } from 'react';
import CommentAuthor from 'components/Comment/Author';
import CommentDate from 'components/Comment/Date';
import CommentReplyLink from 'components/Comment/ReplyLink';

// TODO: retina avatar image.
export default function CommentMeta( props ) {
	const {
		authorUrl, authorName, avatarUrl,
		link, date, dateFormatted,
		allowReplies, onClickReply
	} =  props;

	const replyLinkEl = allowReplies ? ( <CommentReplyLink onClick={ onClickReply } /> ) : null;

	return (
		<footer className="comment-meta">
			<div className="comment-author vcard">
				<p>
					<img className="avatar" src={ avatarUrl } alt={ `${authorName}'s avatar` } />
					<CommentAuthor authorName={ authorName } authorUrl={ authorUrl } />
					{ replyLinkEl }
				</p>
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
	dateFormatted: PropTypes.string.isRequired,
	allowReplies:  PropTypes.bool.isRequired,
	onClickReply:  PropTypes.func.isRequired
};
