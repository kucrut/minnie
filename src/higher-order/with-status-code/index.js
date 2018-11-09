import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

export default function WithStatusCode( props ) {
	const { status, children } = props;

	return (
		<Route
			render={ ( { staticContext } ) => {
				if ( staticContext ) {
					staticContext.status = status;
				}

				return children;
			} }
		/>
	);
}

WithStatusCode.propTypes = {
	status: PropTypes.number.isRequired,
};
