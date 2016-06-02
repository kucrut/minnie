import React, { Component, PropTypes } from 'react';
import CommentContent from 'components/Comment/Content';
import CommentAuthor from 'components/Comment/Author';
import CommentMeta from 'components/Comment/Meta';

export default class Comment extends Component {
	static propTypes = {
		comment: PropTypes.object.isRequired
	}

	constructor( props ) {
		super( props );
		this.handleViewReplies = this.handleViewReplies.bind( this );
	}

	handleViewReplies() {
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
			has_children: hasChildren
		} = this.props.comment;

		return (
			<li id={ `comment-${id}` } className="comment">
				<article className="comment-body">
					<div className="comment-content">
						<CommentAuthor authorName={ authorName } avatarUrl={ avatarUrls[ '48' ] } />
						<CommentContent content={ content.rendered } />
					</div>
					<CommentMeta
						date={ date }
						link={ link }
						hasChildren={ hasChildren }
						dateFormatted={ dateFormatted }
						handleViewReplies={ this.handleViewReplies }
					/>
				</article>
			</li>
		);
	}
}
