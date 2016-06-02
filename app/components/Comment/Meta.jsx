import React, { Component, PropTypes } from 'react';

export default class CommentMeta extends Component {
	static propTypes = {
		date:              PropTypes.string.isRequired,
		link:              PropTypes.string.isRequired,
		dateFormatted:     PropTypes.string.isRequired,
		hasChildren:       PropTypes.bool.isRequired,
		handleClickReply:  PropTypes.func.isRequired,
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

	// TODO: real reply link
	renderReplyLink() {
		const { handleClickReply } = this.props;

		return (
			<a className="comment-reply-link" onClick={ handleClickReply } rel="nofollow">Reply</a>
		);
	}

	render() {
		const { link, date, dateFormatted } = this.props;

		return (
			<div className="comment-metadata">
				<a href={ link }><time dateTime={ date }>{ dateFormatted }</time></a>
				{ this.renderViewReplies() }
				{ this.renderReplyLink() }
			</div>
		);
	}
}
