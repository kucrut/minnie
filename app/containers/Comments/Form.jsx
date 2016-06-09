/* eslint max-len: ["error", 140] */

import React, { PropTypes } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import CancelReplyLink from 'components/Comment/CancelReplyLink';

function CommentForm( props ) {
	const { postId, parentId, fields, handleSubmit, submitting, values, onClickCancelReply } = props;
	const { author, email, url, comment } = fields;
	const {
		comment: vComment,
		author:  vAuthor,
		email:   vEmail
	} = values;
	const reqEl = ( <span className="required">*</span> );

	let buttonArgs = {};
	if ( submitting || ! vAuthor || ! vEmail || ! vComment ) {
		buttonArgs = { disabled: 'disabled' };
	}

	let cancelEl = null;
	if ( 0 !== parentId ) {
		cancelEl = ( <CancelReplyLink onClick={ onClickCancelReply } /> );
	}

	return (
		<div id="respond" className="comment-respond">
			<h3 id="reply-title" className="comment-reply-title">Leave a Reply { cancelEl }</h3>

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
						{ ...comment }
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
					<input type="hidden" name="comment_post_ID" value={ postId } />
					<input type="hidden" name="comment_parent" value={ parentId } />
				</p>
			</form>
		</div>
	);
}

CommentForm.propTypes = {
	...propTypes,
	postId:             PropTypes.number.isRequired,
	parentId:           PropTypes.number.isRequired,
	onClickCancelReply: PropTypes.func.isRequired
};

export default reduxForm({
	form:   'comment',
	fields: ['author', 'email', 'url', 'comment']
})( CommentForm );
