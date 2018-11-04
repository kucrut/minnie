import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem';

export default function PrimaryMenu( { items } ) {
	return (
		<nav id="site-navigation" className="main-navigation" role="navigation">
			<div className="menu-main-container">
				<ul id="menu-main" className="menu">
					{ items.map( item => <MenuItem key={ item.id } item={ item } /> ) }
				</ul>
			</div>
		</nav>
	);
}

PrimaryMenu.propTypes = { items: PropTypes.array.isRequired };
