import React from 'react';
import PropTypes from 'prop-types';

export default function LinkButton( props ) {
	const { className, children, ...rest } = props;

	return (
		<button className={ `link-button ${ className }` } { ...rest }>
			{ children }
		</button>
	);
}

LinkButton.defaultProps = {
	className: '',
};

LinkButton.propTypes = {
	className: PropTypes.string,
};
