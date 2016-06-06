import React, { Component, PropTypes } from 'react';
import CommentContent from 'components/Comment/Content';
import CommentMeta from 'components/Comment/Meta';
import CommentViewRepliesLink from 'components/Comment/ViewRepliesLink';

export default class Comment extends Component {
	static propTypes = {
		comment:            PropTypes.object.isRequired,
		onClickReply:       PropTypes.func.isRequired,
		onClickViewReplies: PropTypes.func.isRequired,
		children:           PropTypes.object
	}

	constructor( props ) {
		super( props );

		this.handleClickReply = this.handleClickReply.bind( this );
		this.handleClickViewReplies = this.handleClickViewReplies.bind( this );
	}

	handleClickReply() {
		const { comment, onClickReply } = this.props;

		onClickReply({ parent: comment.id });
	}

	handleClickViewReplies() {
		const { comment, onClickViewReplies } = this.props;

		onClickViewReplies({ parent: comment.id });
	}

	renderMetadata() {
		const { comment, children } = this.props;

		// If comment doesn't have replies or the replies are already shown.
		if ( ! comment.children_count || children ) {
			return null;
		}

		return (
			<CommentViewRepliesLink onClick={ this.handleClickViewReplies } />
		);
	}

	render() {
		const { comment: c }  = this.props;
		const commentMetaArgs = {
			date:          c.date,
			link:          c.link,
			avatarUrl:     c.author_avatar_urls[ '48' ],
			authorUrl:     c.author_url,
			authorName:    c.author_name,
			dateFormatted: c.date_formatted,
			onClickReply:  this.handleClickReply
		};

		return (
			<li id={ `comment-${c.id}` } className="comment">
				<article className="comment-body">
					<div className="comment-content">
						<CommentMeta { ...commentMetaArgs } />
						<CommentContent content={ c.content.rendered } />
					</div>

					{ this.renderMetadata() }
				</article>

				{ this.props.children }
			</li>
		);
	}
}
