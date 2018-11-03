import React from 'react';
import PropTypes from 'prop-types';

import Required from '../../Required';

export default function CommentField( { value, handleChange } ) {
	return (
		<p className="comment-form-comment">
			<label htmlFor="comment">Comment <Required /></label>
			<textarea
				id="comment"
				cols="45"
				rows="8"
				maxLength="65525"
				aria-required="true"
				required
				name="comment"
				value={ value }
				onChange={ handleChange }
			></textarea>
		</p>
	);
}

CommentField.propTypes = {
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
};
