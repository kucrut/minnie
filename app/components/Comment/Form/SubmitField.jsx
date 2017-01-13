import React, { PropTypes } from 'react';

export default function SubmitField( { isSubmitting, postId, parentId } ) {
	return (
		<p className="form-submit">
			<button className="submit" disabled={ isSubmitting }>Post Comment</button>
			<input type="hidden" name="comment_post_ID" value={ postId } />
			<input type="hidden" name="comment_parent" value={ parentId } />
		</p>
	);
}

SubmitField.propTypes = {
	postId: PropTypes.number.isRequired,
	parentId: PropTypes.number.isRequired,
	isSubmitting: PropTypes.bool.isRequired,
};
