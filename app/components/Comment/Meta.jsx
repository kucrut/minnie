import React, { Component, PropTypes } from 'react';
import CommentAuthor from 'components/Comment/Author';
import CommentDate from 'components/Comment/Date';
import CommentReplyLink from 'components/Comment/ReplyLink';

// TODO: retina avatar image.
export default class CommentMeta extends Component {
	static propTypes = {
		link:          PropTypes.string.isRequired,
		date:          PropTypes.string.isRequired,
		avatarUrl:     PropTypes.string.isRequired,
		authorUrl:     PropTypes.string.isRequired,
		authorName:    PropTypes.string.isRequired,
		dateFormatted: PropTypes.string.isRequired,
		allowReplies:  PropTypes.bool.isRequired,
		onClickReply:  PropTypes.func.isRequired
	}

	renderReplyLink() {
		const { allowReplies, onClickReply } = this.props;

		if ( ! allowReplies ) {
			return null;
		}

		return (
			<CommentReplyLink onClick={ onClickReply } />
		);
	}
	render() {
		const { authorUrl, authorName, avatarUrl, link, date, dateFormatted } = this.props;

		return (
			<footer className="comment-meta">
				<div className="comment-author vcard">
					<p>
						<img className="avatar" src={ avatarUrl } alt={ `${authorName}'s avatar` } />
						<CommentAuthor authorName={ authorName } authorUrl={ authorUrl } />
						{ this.renderReplyLink() }
					</p>
					<p>
						<CommentDate link={ link } date={ date } dateFormatted={ dateFormatted } />
					</p>
				</div>
			</footer>
		);
	}
}
