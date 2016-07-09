/* eslint max-len: ["error", 140] */

import React, { Component, PropTypes } from 'react';
import Spinner from 'components/Spinner';
import CancelReplyLink from 'components/Comment/CancelReplyLink';
import Required from 'components/Required';
import AuthorField from 'components/Comment/Form/AuthorField';
import EmailField from 'components/Comment/Form/EmailField';
import UrlField from 'components/Comment/Form/UrlField';

export default class CommentForm extends Component {
	static propTypes = {
		postId:          PropTypes.number.isRequired,
		user:            PropTypes.object.isRequired,
		parentComment:   PropTypes.object.isRequired,
		cancelReplyLink: PropTypes.string.isRequired,
		fields:          PropTypes.object.isRequired,
		handleSubmit:    PropTypes.func.isRequired,
		isSubmitting:    PropTypes.bool.isRequired,
		hasError:        PropTypes.bool.isRequired,
		error:           PropTypes.object.isRequired,
	}

	constructor( props ) {
		super( props );

		this.state = {
			values: Object.assign({}, props.fields )
		};

		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
		this.renderField = this.renderField.bind( this );
	}

	componentWillReceiveProps( nextProps ) {
		const { hasError, isSubmitting } = nextProps;

		// After successful submission: Reset comment textarea.
		if ( ! hasError && ! isSubmitting && this.props.isSubmitting ) {
			this.setState({
				values: Object.assign({}, this.state.values, {
					comment: ''
				})
			});
		}
	}

	handleChange( e ) {
		this.setState({
			values: Object.assign({}, this.state.values, {
				[ e.target.name ]: e.target.value
			})
		});
	}

	handleSubmit( e ) {
		e.preventDefault();
		this.props.handleSubmit( this.state.values );
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

	renderCommentField() {
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
					name="comment"
					value={ this.state.values.comment }
					onChange={ this.handleChange }
				></textarea>
			</p>
		);
	}

	renderField( key ) {
		const { author, email, url } = this.state.values;

		switch ( key ) {
			case 'comment':
				return this.renderCommentField();

			case 'author':
				return ( <AuthorField value={ author } handleChange={ this.handleChange } key="author-field" /> );

			case 'email':
				return ( <EmailField value={ email } handleChange={ this.handleChange } key="email-field" /> );

			case 'url':
				return ( <UrlField value={ url } handleChange={ this.handleChange } key="url-field" /> );

			default:
				return null;
		}
	}

	renderErrors() {
		const { error } = this.props;

		return (
			<div className="comment-error">
				{ Object.keys( error ).map( field => <p key={ `error-${field}` }>{ error[ field ] }</p> ) }
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
			<p className="comment-notes">Your email address will not be published. Required fields are marked <Required /></p>
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
		const { postId, parentComment, fields, isSubmitting } = this.props;

		return (
			<div id="respond" className="comment-respond">
				{ this.renderTitle() }

				<form onSubmit={ this.handleSubmit } method="post" action="/wp-comments-post.php">
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
