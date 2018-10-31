import React, { PropTypes } from 'react';
import Spinner from 'components/Spinner';

export default function Cover( { isSubmitting } ) {
	if ( isSubmitting ) {
		return (
			<div className="cover"><Spinner /></div>
		);
	}

	return null;
}

Cover.propTypes = { isSubmitting: PropTypes.bool.isRequired };
