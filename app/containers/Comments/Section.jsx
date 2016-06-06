import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchComments, postComment } from 'actions/comments';
import CommentsList from 'containers/Comments/List';
import CommentForm from 'containers/Comments/Form';

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

		this.state = {
			parentId: 0
		};

		this.fetchMore = this.fetchMore.bind( this );
		this.renderForm = this.renderForm.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
		this.handleClickReply = this.handleClickReply.bind( this );
		this.handleClickCancelReply = this.handleClickCancelReply.bind( this );
	}

	fetchMore( params ) {
		const { dispatch, comments: { postId } } = this.props;
		const fetchParams = Object.assign({ post: postId }, params );

		dispatch( fetchComments( fetchParams ) );
	}

	handleClickReply( params ) {
		this.setState({
			parentId: params.parent
		});
	}

	handleClickCancelReply() {
		this.handleClickReply({ parent: 0 });
	}

	handleSubmit( values ) {
		const { dispatch } = this.props;

		// Do some checks here?
		dispatch( postComment( values ) );
	}

	renderCommentsList() {
		const parentId = 0;
		const { comments } = this.props;
		const items = comments.threads[ `t${parentId}` ].items;

		if ( ! items.length ) {
			return null;
		}

		const args = {
			onClickViewReplies: this.fetchMore,
			onClickLoadMore:    this.fetchMore,
			onClickReply:       this.handleClickReply,
			renderForm:         this.renderForm,
			listClass:          'comment-list',
			parentId,
			comments
		};

		return (
			<CommentsList { ...args } />
		);
	}

	renderForm( parentId ) {
		if ( parentId !== this.state.parentId ) {
			return null;
		}

		const { isEnabled, comments: { postId } } = this.props;

		if ( ! isEnabled ) {
			return null;
		}

		const args = {
			onClickCancelReply: this.handleClickCancelReply,
			onSubmit:           this.handleSubmit,
			initialValues:      {
				comment_post_ID: postId,
				comment_parent:  parentId
			}
		};

		return (
			<CommentForm key="comment-form" { ...args } />
		);
	}

	render() {
		const { isEnabled, comments } = this.props;

		// TODO: Update this check when the comment form is ready.
		if ( ! isEnabled || ! comments.threads.t0.items.length ) {
			return null;
		}

		return (
			<div className="comments-area" id="comments">
				<h2 className="comments-title">Comments</h2>

				{ this.renderCommentsList() }
				{ this.renderForm( 0 ) }
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
