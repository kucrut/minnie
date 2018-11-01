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
	static need = [ fetchPost ]

	static displayName = 'Post'

	fetchData( slug ) {
		this.props.dispatch( fetchPost( { slug } ) );
	}

	renderComments() {
		const { info, user, singular, comments, query, dispatch } = this.props;
		const parentId = query.hasOwnProperty( 'replytocom' ) ? parseInt( query.replytocom, 10 ) : 0;
		const args = {
			isEnabled: singular.data.comment_status === 'open',
			postLink: singular.data.link,
			maxDepth: info.settings.comments.threads_depth,
			comments,
			parentId,
			dispatch,
			user,
		};

		return (
			<CommentsSection { ...args } />
		);
	}
}

export function mapStateToProps( state, ownProps ) {
	const { slug } = ownProps.params;

	return {
		info: state.info,
		singular: state.singular,
		comments: state.comments,
		user: state.session.user,
		query: ownProps.location.query,
		slug,
	};
}

export default connect( mapStateToProps )( Post );
