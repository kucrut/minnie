import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { decode } from 'he';

export default function Branding( { name } ) {
	return (
		<div className="site-branding">
			<h1 className="site-title"><Link to="/">{ decode( name ) }</Link></h1>
		</div>
	);
}

Branding.propTypes = { name: PropTypes.string.isRequired };
