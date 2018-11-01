import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentAuthor from 'components/Comment/Author';
import CommentDate from 'components/Comment/Date';
import CommentReplyLink from 'components/Comment/ReplyLink';
import CommentViewRepliesLink from 'components/Comment/ViewRepliesLink';

// TODO: retina avatar image.
export default class CommentMeta extends Component {
	static propTypes = {
		link:               PropTypes.string.isRequired,
		date:               PropTypes.string.isRequired,
		avatarUrl:          PropTypes.string.isRequired,
		authorUrl:          PropTypes.string.isRequired,
		authorName:         PropTypes.string.isRequired,
		dateFormatted:      PropTypes.string.isRequired,
		replyLink:          PropTypes.string.isRequired,
		allowReplies:       PropTypes.bool.isRequired,
		showViewReplies:    PropTypes.bool.isRequired,
		onClickViewReplies: PropTypes.func.isRequired,
	}

	renderReplyLink() {
		const { replyLink, allowReplies } = this.props;

		if ( ! allowReplies ) {
			return null;
		}

		return (
			<CommentReplyLink link={ replyLink } />
		);
	}

	renderViewRepliesLink() {
		const { showViewReplies, onClickViewReplies } = this.props;

		if ( ! showViewReplies ) {
			return null;
		}

		return (
			<CommentViewRepliesLink onClick={ onClickViewReplies } />
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
						{ this.renderViewRepliesLink() }
					</p>
				</div>
			</footer>
		);
	}
}
