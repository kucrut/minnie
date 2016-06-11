import React, { Component, PropTypes } from 'react';
import { each, find } from 'lodash';
import { fetchComments, postComment } from 'actions/comments';
import CommentsList from 'containers/Comments/List';
import CommentForm from 'containers/Comments/Form';

export default class Comments extends Component {
	static propTypes = {
		dispatch:  PropTypes.func.isRequired,
		isEnabled: PropTypes.bool.isRequired,
		user:      PropTypes.object.isRequired,
		parentId:  PropTypes.number.isRequired,
		postLink:  PropTypes.string.isRequired,
		comments:  PropTypes.shape({
			postId:       PropTypes.number,
			threads:      PropTypes.object,
			error:        PropTypes.object,
			hasError:     PropTypes.bool,
			isSubmitting: PropTypes.bool
		}).isRequired,
	}

	constructor( props ) {
		super( props );

		this.state = {
			parentId: props.parentId
		};

		this.extraCommentFields = {
			author: '',
			email:  '',
			url:    ''
		};

		this.fetchMore = this.fetchMore.bind( this );
		this.renderForm = this.renderForm.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	componentWillReceiveProps( nextProps ) {
		this.setState({
			parentId: nextProps.parentId
		});
	}

	getParentComment( id ) {
		const { threads } = this.props.comments;
		let parentComment;

		if ( 0 === id ) {
			parentComment = { id: 0 };
		} else {
			each( threads, thread => {
				parentComment = find( thread.items, { id });

				if ( parentComment ) {
					return false;
				}

				return true;
			});
		}

		return parentComment;
	}

	fetchMore( params ) {
		const { dispatch, comments: { postId } } = this.props;
		const fetchParams = Object.assign({ post: postId }, params );

		dispatch( fetchComments( fetchParams ) );
	}

	handleSubmit( values ) {
		const { dispatch, comments: { postId } } = this.props;
		let data = {
			post:    postId,
			parent:  this.state.parentId,
			content: values.comment,
		};

		Object.keys( this.extraCommentFields ).forEach( key => {
			if ( values.hasOwnProperty( key ) ) {
				const newKey = 'author' === key ? 'author_name' : `author_${key}`;

				data = Object.assign({}, data, {
					[ newKey ]: values[ key ]
				});
			}
		});

		// TODO: Do some checks here?
		dispatch( postComment( data ) );
	}

	renderCommentsList() {
		const parentId = 0;
		const { isEnabled, comments } = this.props;
		const items = comments.threads[ `t${parentId}` ].items;

		if ( ! items.length ) {
			return null;
		}

		const args = {
			onClickViewReplies: this.fetchMore,
			onClickLoadMore:    this.fetchMore,
			renderForm:         this.renderForm,
			allowReplies:       isEnabled,
			listClass:          'comment-list',
			parentId,
			comments
		};

		return (
			<CommentsList { ...args } />
		);
	}

	renderForm( parentId ) {
		let args;

		if ( parentId !== this.state.parentId ) {
			return null;
		}

		if ( ! this.props.isEnabled ) {
			return null;
		}

		const { user, postLink, comments } = this.props;
		const { postId, isSubmitting, hasError, error } = comments;

		// TODO: Better cancelReplyLink?

		args = {
			cancelReplyLink: postLink,
			handleSubmit:    this.handleSubmit,
			parentComment:   this.getParentComment( parentId ),
			fields:          { comment: '' },
			submitError:     error,
			isSubmitting,
			hasError,
			postId,
			user
		};

		// Non-logged in visitor.
		if ( ! user.hasOwnProperty( 'id' ) ) {
			args = Object.assign({}, args, {
				fields: Object.assign({}, args.fields, this.extraCommentFields )
			});
		}

		return (
			<CommentForm key="comment-form" { ...args } />
		);
	}

	render() {
		const { isEnabled, comments } = this.props;

		if ( ! isEnabled && ! comments.threads.t0.items.length ) {
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
