/* eslint max-len: ["error", 140] */

import React, { Component, PropTypes } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import CancelReplyLink from 'components/Comment/CancelReplyLink';

class CommentForm extends Component {
	static propTypes = {
		...propTypes,
		userId:             PropTypes.number.isRequired,
		postId:             PropTypes.number.isRequired,
		parentComment:      PropTypes.object.isRequired,
		onClickCancelReply: PropTypes.func.isRequired,
	}

	constructor( props ) {
		super( props );
		this.renderField = this.renderField.bind( this );
	}

	renderTitle() {
		const { parentComment: p, onClickCancelReply } = this.props;
		let text = 'Leave a Reply';
		let cancelLinkEl = '';

		if ( 0 < p.id ) {
			text = `${text} to ${p.author_name}`;
			cancelLinkEl = ( <CancelReplyLink onClick={ onClickCancelReply } /> );
		}

		return (
			<h3 id="reply-title" className="comment-reply-title">{ text } { cancelLinkEl }</h3>
		);
	}

	renderAsterisk() {
		return (
			<span className="required">*</span>
		);
	}

	renderCommentField() {
		const { comment } = this.props.fields;

		return (
			<p className="comment-form-comment" key="comment-field">
				<label htmlFor="comment">Comment</label>
				<textarea
					id="comment"
					cols="45"
					rows="8"
					maxLength="65525"
					aria-required="true"
					required
					{ ...comment }
				></textarea>
			</p>
		);
	}

	renderAuthorField() {
		const { author } = this.props.fields;

		return (
			<p className="comment-form-author" key="author-field">
				<label htmlFor="author">Name { this.renderAsterisk() }</label>
				<input
					type="text"
					id="author"
					size="30"
					maxLength="245"
					aria-required="true"
					required
					{ ...author }
				/>
			</p>
		);
	}

	renderEmailField() {
		const { email } = this.props.fields;

		return (
			<p className="comment-form-email" key="email-field">
				<label htmlFor="email">Email { this.renderAsterisk() }</label>
				<input
					type="email"
					id="email"
					size="30"
					maxLength="100"
					aria-describedby="email-notes"
					aria-required="true"
					required
					{ ...email }
				/>
			</p>
		);
	}

	renderUrlField() {
		const { url } = this.props.fields;

		return (
			<p className="comment-form-url" key="url-field">
				<label htmlFor="url">Website</label>
				<input type="url" id="url" size="30" maxLength="200" { ...url } />
			</p>
		);
	}

	renderField( key ) {
		switch ( key ) {
			case 'comment':
				return this.renderCommentField();

			case 'author':
				return this.renderAuthorField();

			case 'email':
				return this.renderEmailField();

			case 'url':
				return this.renderUrlField();

			default:
				return null;
		}
	}

	render() {
		const { postId, parentComment, fields, handleSubmit, submitting } = this.props;
		const reqEl = this.renderAsterisk();

		return (
			<div id="respond" className="comment-respond">
				{ this.renderTitle() }

				<form onSubmit={ handleSubmit } method="post" action="/wp-comments-post.php">
					<p className="comment-notes">Your email address will not be published. Required fields are marked { reqEl }</p>

					{ Object.keys( fields ).map( this.renderField ) }

					<p className="form-submit">
						<button className="submit" disabled={ submitting }>Post Comment</button>
						<input type="hidden" name="comment_post_ID" value={ postId } />
						<input type="hidden" name="comment_parent" value={ parentComment.id } />
					</p>
				</form>
			</div>
		);
	}
}

export default reduxForm({ form: 'comment' })( CommentForm );
