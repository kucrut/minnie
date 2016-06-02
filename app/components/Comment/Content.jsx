import React, { Component, PropTypes } from 'react';
import highlightCode from 'misc/highlight';

export default class CommentContent extends Component {
	static propTypes = {
		content: PropTypes.string.isRequired
	}

	componentDidMount() {
		highlightCode( this.refs.theComment );
	}

	render() {
		return (
			<div
				ref="theComment"
				className="comment-text"
				dangerouslySetInnerHTML={ { __html: this.props.content } }
			/>
		);
	}
}
