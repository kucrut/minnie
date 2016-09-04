import React, { PropTypes } from 'react';

export default function Errors({ error }) {
	return (
		<div className="comment-error">
			{ Object.keys( error ).map( field => <p key={ `error-${field}` }>{ error[ field ] }</p> ) }
		</div>
	);
}

Errors.propTypes = {
	error: PropTypes.object.isRequired
};
