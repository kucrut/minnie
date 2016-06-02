import React from 'react';
import { connect } from 'react-redux';
import { fetchPost } from 'actions/singular';
import _Singular from 'pages/_Singular';
import CommentsSection from 'containers/Comments/Section';


class Post extends _Singular {

	/**
	 * Callbacks needed for server-side rendering
	 *
	 * Functions listed here will be called automatically by `fetchComponentDataBeforeRender()`
	 *     when this component is rendered by the server.
	 *
	 * @type {Array}
	 */
	static need = [
		fetchPost
	]

	static displayName = 'Post'

	fetchData( slug ) {
		this.props.dispatch( fetchPost({ slug }) );
	}

	// TODO: Bail if discussion is disabled AND there's no comments.
	renderComments() {
		return ( <CommentsSection comments={ this.props.comments } /> );
	}
}

export function mapStateToProps( state, ownProps ) {
	const { slug } = ownProps.params;

	return {
		info:     state.info,
		singular: state.singular,
		comments: state.comments,
		slug
	};
}

export default connect( mapStateToProps )( Post );
