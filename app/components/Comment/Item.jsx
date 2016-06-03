import React, { Component, PropTypes } from 'react';
import CommentContent from 'components/Comment/Content';
import CommentFooter from 'components/Comment/Footer';
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
		const { id, date, link, content, date_formatted,
			author_name, author_avatar_urls,
			children_count: childrenCount
		} = this.props.comment;

		const cfArgs = {
			avatarUrl:     author_avatar_urls[ '48' ],
			authorName:    author_name,
			dateFormatted: date_formatted,
			date, link
		};

		return (
			<li id={ `comment-${id}` } className="comment">
				<article className="comment-body">
					<div className="comment-content">
						<CommentFooter { ...cfArgs } />
						<CommentContent content={ content.rendered } />
					</div>

					<div className="comment-metadata">
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
