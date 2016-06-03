import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from 'actions/comments';
import CommentsList from 'containers/Comments/List';

class Comments extends Component {
	static propTypes = {
		dispatch:  PropTypes.func.isRequired,
		isEnabled: PropTypes.bool.isRequired,
		comments:  PropTypes.shape({
			postId:  PropTypes.number,
			threads: PropTypes.object
		}).isRequired
	}

	constructor( props ) {
		super( props );

		this.fetchMore = this.fetchMore.bind( this );
		this.handleClickReply = this.handleClickReply.bind( this );
		this.handleClickViewReplies = this.handleClickViewReplies.bind( this );
	}

	fetchMore( params ) {
		const { dispatch, comments } = this.props;
		const { post, currentPage } = comments;
		const fetchParams = Object.assign({}, params, {
			page: currentPage + 1,
			post
		});

		dispatch( fetchComments( fetchParams ) );
	}

	handleClickReply() {
		// TODO.
	}

	handleClickViewReplies() {
		// TODO.
	}

	render() {
		const threadId = 't0';
		const { isEnabled, comments } = this.props;
		const items = comments.threads[ threadId ].items;

		if ( ! isEnabled && ! items.length ) {
			return null;
		}

		const listArgs = {
			onClickViewReplies: this.handleClickViewReplies,
			onClickReply:       this.handleClickReply,
			listClass:          'comment-list',
			threadId,
			comments
		};

		return (
			<div className="comments-area" id="comments">
				<h2 className="comments-title">Comments</h2>

				<CommentsList { ...listArgs } />
			</div>
		);
	}
}

function mapStateToProps( state ) {
	return {
		comments: state.comments
	};
}

export default connect( mapStateToProps )( Comments );
