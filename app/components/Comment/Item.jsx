import React, { Component, PropTypes } from 'react';
import CommentContent from 'components/Comment/Content';
import CommentMeta from 'components/Comment/Meta';
import CommentViewRepliesLink from 'components/Comment/ViewRepliesLink';

export default class Comment extends Component {
	static defaultProps = {
		repliesEl: null
	}

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

	render() {
		const { comment: c }  = this.props;
		const commentMetaArgs = {
			date:          c.date,
			link:          c.link,
			avatarUrl:     c.author_avatar_urls[ '48' ],
			authorUrl:     c.author_url,
			authorName:    c.author_name,
			dateFormatted: c.date_formatted
		};

		const commentViewRepliesLinkArgs = {
			count:   c.children_count,
			onClick: this.handleClickViewReplies
		};

		return (
			<li id={ `comment-${c.id}` } className="comment">
				<article className="comment-body">
					<div className="comment-content">
						<CommentMeta { ...commentMetaArgs } />
						<CommentContent content={ c.content.rendered } />
					</div>

					<div className="comment-metadata">
						<CommentViewRepliesLink { ...commentViewRepliesLinkArgs } />
					</div>
				</article>

				{ this.props.children }
			</li>
		);
	}
}
