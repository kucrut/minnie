import React from 'react';
import PropTypes from 'prop-types';

export default function PageHeader( props ) {
	const { description, title } = props;

	return (
		<header className="page-header">
			<h1 className="page-title">{ title }</h1>
			{ description ? (
				<div
					className="taxonomy-description"
					dangerouslySetInnerHTML={ { __html: description } }
				/>
			) : null }
		</header>
	);
}

PageHeader.defaultProps = {
	description: '',
};

PageHeader.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
};
