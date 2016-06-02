import React, { Component, PropTypes } from 'react';

export default class CommentMeta extends Component {
	static propTypes = {
		date:              PropTypes.string.isRequired,
		link:              PropTypes.string.isRequired,
		dateFormatted:     PropTypes.string.isRequired,
		hasChildren:       PropTypes.bool.isRequired,
		handleViewReplies: PropTypes.func.isRequired
	}

	renderViewReplies() {
		const { hasChildren, handleViewReplies } = this.props;
		let el;

		if ( hasChildren ) {
			el = (
				<a className="comment-view-replies-link" onClick={ handleViewReplies }>View replies</a>
			);
		}

		return el;
	}

	render() {
		const { link, date, dateFormatted } = this.props;

		return (
			<div className="comment-metadata">
				<a href={ link }><time dateTime={ date }>{ dateFormatted }</time></a>
				{ this.renderViewReplies() }
				<a href="#" className="comment-reply-link" rel="nofollow">Reply</a>
			</div>
		);
	}
}
