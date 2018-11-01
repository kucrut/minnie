import React from 'react';
import PropTypes from 'prop-types';
import Required from 'components/Required';

export default function EmailField( { value, handleChange } ) {
	return (
		<p className="comment-form-email">
			<label htmlFor="email">Email <Required /></label>
			<input
				type="email"
				id="email"
				size="30"
				maxLength="100"
				aria-describedby="email-notes"
				aria-required="true"
				required
				name="email"
				value={ value }
				onChange={ handleChange }
			/>
		</p>
	);
}

EmailField.propTypes = {
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
};
