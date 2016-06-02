import React, { Component, PropTypes } from 'react';
import CommentsList from 'containers/Comments/List';

export default class Comments extends Component {
	static propTypes = {
		comments: PropTypes.object.isRequired
	}

	renderList() {
		const { items } = this.props.comments;
		let el;

		if ( items.length ) {
			el = (
				<CommentsList items={ items } listClass="comment-list" />
			);
		}

		return el;
	}

	renderMoreButton() {}

	render() {
		return (
			<div className="comments-area" id="comments">
				<h2 className="comments-title">Comments</h2>

				{ this.renderList() }
			</div>
		);
	}
}
