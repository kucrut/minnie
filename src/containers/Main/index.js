import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export default function Main( props ) {
	const { children, ...rest } = props;

	return (
		<Fragment>
			<Helmet { ...rest } />

			<div id="primary" className="content-area">
				<main id="main" className="site-main" role="main">
					{ children }
				</main>
			</div>
		</Fragment>
	);
}

Main.defaultProps = {
	titleTemplate: '',
};

Main.propTypes = {
	title: PropTypes.string.isRequired,
	titleTemplate: PropTypes.string,
};
