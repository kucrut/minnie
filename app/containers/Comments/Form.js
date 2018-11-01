/* eslint max-len: ["error", 140] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CancelReplyLink from 'components/Comment/CancelReplyLink';
import Cover from 'components/Comment/Form/Cover';
import Notes from 'components/Comment/Form/Notes';
import Errors from 'components/Comment/Form/Errors';
import CommentField from 'components/Comment/Form/CommentField';
import AuthorField from 'components/Comment/Form/AuthorField';
import EmailField from 'components/Comment/Form/EmailField';
import UrlField from 'components/Comment/Form/UrlField';
import SubmitField from 'components/Comment/Form/SubmitField';

export default class CommentForm extends Component {
	static propTypes = {
		postId: PropTypes.number.isRequired,
		user: PropTypes.object.isRequired,
		parentComment: PropTypes.object.isRequired,
		cancelReplyLink: PropTypes.string.isRequired,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		isSubmitting: PropTypes.bool.isRequired,
		hasError: PropTypes.bool.isRequired,
		error: PropTypes.object.isRequired,
	}

	constructor( props ) {
		super( props );

		this.state = {
			cfKey: this.getCFKey(),
			values: Object.assign( {}, props.fields ),
		};

		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
		this.renderField = this.renderField.bind( this );
	}

	componentWillReceiveProps( nextProps ) {
		const { hasError, isSubmitting } = nextProps;

		// After successful submission: Reset comment textarea.
		if ( ! hasError && ! isSubmitting && this.props.isSubmitting ) {
			this.setState( {
				cfKey: this.getCFKey(),
				values: Object.assign( {}, this.state.values, { comment: '' } ),
			} );
		}
	}

	getCFKey() {
		return `comment-field-${Math.random()}`;
	}

	handleChange( e ) {
		this.setState( { values: Object.assign( {}, this.state.values, { [ e.target.name ]: e.target.value } ) } );
	}

	handleSubmit( e ) {
		e.preventDefault();
		this.props.handleSubmit( this.state.values );
	}

	renderTitle() {
		const { parentComment: p, cancelReplyLink } = this.props;
		let text = 'Leave a Reply';
		let cancelLinkEl = '';

		if ( p.id > 0 ) {
			text = `${text} to ${p.author_name}`;
			cancelLinkEl = ( <CancelReplyLink link={ cancelReplyLink } /> );
		}

		return (
			<h3 id="reply-title" className="comment-reply-title">{ text } { cancelLinkEl }</h3>
		);
	}

	renderField( key ) {
		const { comment, author, email, url } = this.state.values;

		switch ( key ) {
			case 'comment':
				return <CommentField value={ comment } handleChange={ this.handleChange } key={ this.state.cfKey } />;

			case 'author':
				return <AuthorField value={ author } handleChange={ this.handleChange } key="author-field" />;

			case 'email':
				return <EmailField value={ email } handleChange={ this.handleChange } key="email-field" />;

			case 'url':
				return <UrlField value={ url } handleChange={ this.handleChange } key="url-field" />;

			default:
				return null;
		}
	}

	// TODO: Add logout link.
	renderNotes() {
		const { user, hasError, error } = this.props;

		if ( hasError ) {
			return <Errors error={ error } />;
		}

		return ( <Notes userName={ user.name || '' } /> );
	}

	render() {
		const { postId, parentComment, fields, isSubmitting } = this.props;

		return (
			<div id="respond" className="comment-respond">
				{ this.renderTitle() }

				<form onSubmit={ this.handleSubmit } method="post" action="/wp-comments-post.php">
					{ this.renderNotes() }

					{ Object.keys( fields ).map( this.renderField ) }

					<SubmitField isSubmitting={ isSubmitting } postId={ postId } parentId={ parentComment.id } />
				</form>

				<Cover isSubmitting={ isSubmitting } />
			</div>
		);
	}
}
