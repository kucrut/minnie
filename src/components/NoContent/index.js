import React from 'react';
import PropTypes from 'prop-types';

import SearchForm from '../SearchForm';

export default function NoContent( props ) {
	return (
		<div className="page-content">
			<p>{ props.text }</p>
			<SearchForm />
		</div>
	);
}

NoContent.propTypes = {
	text: PropTypes.string.isRequired,
};
