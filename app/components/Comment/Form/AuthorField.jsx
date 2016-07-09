import React, { PropTypes } from 'react';
import Required from 'components/Required';

export default function AuthorField({ value, handleChange }) {
	return (
		<p className="comment-form-author" key="author-field">
			<label htmlFor="author">Name <Required /></label>
			<input
				type="text"
				id="author"
				size="30"
				maxLength="245"
				aria-required="true"
				required
				name="author"
				value={ value }
				onChange={ handleChange }
			/>
		</p>
	);
}

AuthorField.propTypes = {
	value:        PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired
};
