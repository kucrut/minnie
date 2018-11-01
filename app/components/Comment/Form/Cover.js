import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../Spinner';

export default function Cover( { isSubmitting } ) {
	if ( isSubmitting ) {
		return (
			<div className="cover"><Spinner /></div>
		);
	}

	return null;
}

Cover.propTypes = { isSubmitting: PropTypes.bool.isRequired };
