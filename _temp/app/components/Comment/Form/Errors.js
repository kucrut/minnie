import React from 'react';
import PropTypes from 'prop-types';

export default function Errors( { error } ) {
	return (
		<div className="comment-error">
			{ Object.keys( error ).map( field => <p key={ `error-${field}` }>{ error[ field ] }</p> ) }
		</div>
	);
}

Errors.propTypes = { error: PropTypes.object.isRequired };
