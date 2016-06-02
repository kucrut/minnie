import React, { Component, PropTypes } from 'react';
import CommentContent from 'components/Comment/Content';
import CommentFooter from 'components/Comment/Footer';
import CommentDate from 'components/Comment/Date';
import CommentViewRepliesLink from 'components/Comment/ViewRepliesLink';
import CommentReplyLink from 'components/Comment/ReplyLink';

export default class Comment extends Component {
	static propTypes = {
		comment: PropTypes.object.isRequired
	}

	constructor( props ) {
		super( props );

		this.handleClickReply = this.handleClickReply.bind( this );
		this.handleClickViewReplies = this.handleClickViewReplies.bind( this );
	}

	handleClickReply() {
		// TODO.
	}

	handleClickViewReplies() {
		// TODO.
	}

	render() {
		const {
			id,
			date,
			link,
			content,
			date_formatted: dateFormatted,
			author_name: authorName,
			author_avatar_urls: avatarUrls,
			children_count: childrenCount
		} = this.props.comment;

		return (
			<li id={ `comment-${id}` } className="comment">
				<article className="comment-body">
					<div className="comment-content">
						<CommentFooter authorName={ authorName } avatarUrl={ avatarUrls[ '48' ] } />
						<CommentContent content={ content.rendered } />
					</div>

					<div className="comment-metadata">
						<CommentDate
							link={ link }
							date={ date }
							dateFormatted={ dateFormatted }
						/>
						<CommentViewRepliesLink
							count={ childrenCount }
							onClick={ this.handleClickViewReplies }
						/>
						<CommentReplyLink onClick={ this.handleClickReply } />
					</div>
				</article>
			</li>
		);
	}
}
