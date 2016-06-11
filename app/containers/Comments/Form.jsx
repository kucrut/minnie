/* eslint max-len: ["error", 140] */

import React, { Component, PropTypes } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import Spinner from 'components/Spinner';
import CancelReplyLink from 'components/Comment/CancelReplyLink';

class CommentForm extends Component {
	static propTypes = {
		...propTypes,
		postId:          PropTypes.number.isRequired,
		user:            PropTypes.object.isRequired,
		parentComment:   PropTypes.object.isRequired,
		cancelReplyLink: PropTypes.string.isRequired,
		isSubmitting:    PropTypes.bool.isRequired,
		hasError:        PropTypes.bool.isRequired,
		submitError:     PropTypes.object.isRequired,
	}

	constructor( props ) {
		super( props );
		this.renderField = this.renderField.bind( this );
	}

	renderTitle() {
		const { parentComment: p, cancelReplyLink } = this.props;
		let text = 'Leave a Reply';
		let cancelLinkEl = '';

		if ( 0 < p.id ) {
			text = `${text} to ${p.author_name}`;
			cancelLinkEl = ( <CancelReplyLink link={ cancelReplyLink } /> );
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

	renderErrors() {
		const { submitError } = this.props;

		return (
			<div className="comment-error">
				{ Object.keys( submitError ).map( field => <p key={ `error-${field}` }>{ submitError[ field ] }</p> ) }
			</div>
		);
	}

	// TODO: Add logout link.
	renderNotes() {
		const { user, hasError } = this.props;

		if ( hasError ) {
			return this.renderErrors();
		}

		if ( user.hasOwnProperty( 'name' ) ) {
			return (
				<p className="logged-in-as">Logged in as <em>{ user.name }</em>.</p>
			);
		}

		return (
			<p className="comment-notes">Your email address will not be published. Required fields are marked { this.renderAsterisk() }</p>
		);
	}

	renderCover() {
		if ( ! this.props.isSubmitting ) {
			return null;
		}

		return (
			<div className="cover"><Spinner /></div>
		);
	}

	render() {
		const { postId, parentComment, fields, handleSubmit, isSubmitting } = this.props;

		return (
			<div id="respond" className="comment-respond">
				{ this.renderTitle() }

				<form onSubmit={ handleSubmit } method="post" action="/wp-comments-post.php">
					{ this.renderNotes() }

					{ Object.keys( fields ).map( this.renderField ) }

					<p className="form-submit">
						<button className="submit" disabled={ isSubmitting }>Post Comment</button>
						<input type="hidden" name="comment_post_ID" value={ postId } />
						<input type="hidden" name="comment_parent" value={ parentComment.id } />
					</p>
				</form>

				{ this.renderCover() }
			</div>
		);
	}
}

export default reduxForm({ form: 'comment' })( CommentForm );
