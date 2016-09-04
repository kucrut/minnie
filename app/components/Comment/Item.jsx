import React, { Component, PropTypes } from 'react';
import { find } from 'lodash';
import CommentContent from 'components/Comment/Content';
import CommentMeta from 'components/Comment/Meta';

export default class Comment extends Component {
	static propTypes = {
		comment:            PropTypes.object.isRequired,
		allowReplies:       PropTypes.bool.isRequired,
		onClickViewReplies: PropTypes.func.isRequired,
		children:           PropTypes.array
	}

	constructor( props ) {
		super( props );

		this.handleClickViewReplies = this.handleClickViewReplies.bind( this );
	}

	handleClickViewReplies() {
		const { comment, onClickViewReplies } = this.props;

		onClickViewReplies({ parent: comment.id });
	}

	showViewReplies() {
		const { comment, children } = this.props;
		const repliesEl = find( children, { key: 'children-comments' });

		return ( 0 < comment.children_count && ! repliesEl );
	}

	render() {
		const { allowReplies, comment: c } = this.props;
		const commentMetaArgs = {
			date:               c.date,
			link:               c.link,
			avatarUrl:          c.author_avatar_urls[ '48' ],
			authorUrl:          c.author_url,
			authorName:         c.author_name,
			dateFormatted:      c.date_formatted,
			allowReplies:       ( allowReplies && 'approved' === c.status ),
			replyLink:          c.reply_link,
			showViewReplies:    this.showViewReplies(),
			onClickViewReplies: this.handleClickViewReplies
		};

		return (
			<li id={ `comment-${c.id}` } className="comment">
				<article className="comment-body">
					<div className="comment-content">
						<CommentMeta { ...commentMetaArgs } />
						<CommentContent content={ c.content.rendered } />
					</div>
				</article>

				{ this.props.children }
			</li>
		);
	}
}
