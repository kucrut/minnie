/* eslint max-len: ["error", 140] */

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

function CommentForm( props ) {
	const { fields, handleSubmit, submitting, values } = props;
	const {
		author, email, url, content,
		comment_post_ID: commentPostId,
		comment_parent:  commentParent
	} = fields;
	const {
		content: vContent,
		author:  vAuthor,
		email:   vEmail
	} = values;
	const reqEl = ( <span className="required">*</span> );

	let buttonArgs = {};
	if ( submitting || ! vAuthor || ! vEmail || ! vContent ) {
		buttonArgs = { disabled: 'disabled' };
	}

	// TODO: Add cancel reply link.
	return (
		<div id="respond" className="comment-respond">
			<h3 id="reply-title" className="comment-reply-title">Leave a Reply</h3>

			<form onSubmit={ handleSubmit } method="post" action="/wp-comments-post.php">
				<p className="comment-notes">Your email address will not be published. Required fields are marked { reqEl }</p>
				<p className="comment-form-comment">
					<label htmlFor="comment">Comment</label>
					<textarea
						id="comment"
						cols="45"
						rows="8"
						maxLength="65525"
						aria-required="true"
						required
						{ ...content }
					></textarea>
				</p>
				<p className="comment-form-author">
					<label htmlFor="author">Name { reqEl }</label>
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
				<p className="comment-form-email">
					<label htmlFor="email">Email { reqEl }</label>
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
				<p className="comment-form-url">
					<label htmlFor="url">Website</label>
					<input type="url" id="url" size="30" maxLength="200" { ...url } />
				</p>
				<p className="form-submit">
					<button className="submit" { ...buttonArgs }>Post Comment</button>
					<input type="hidden" { ...commentPostId } />
					<input type="hidden" { ...commentParent } />
				</p>
			</form>
		</div>
	);
}

CommentForm.propTypes = {
	fields:       PropTypes.object.isRequired,
	values:       PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	submitting:   PropTypes.bool.isRequired,
	error:        PropTypes.string
};

export default reduxForm({
	form:   'comment',
	fields: ['author', 'email', 'url', 'content', 'comment_post_ID', 'comment_parent']
})( CommentForm );
