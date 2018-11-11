import React from 'react';
import PropTypes from 'prop-types';

export default function CommentFormUrlField( { value, handleChange } ) {
	return (
		<p className="comment-form-url">
			<label htmlFor="url">Website</label>
			<input
				type="url"
				id="url"
				size="30"
				maxLength="200"
				name="url"
				value={ value }
				onChange={ handleChange }
			/>
		</p>
	);
}

CommentFormUrlField.propTypes = {
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
};
