import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

export default function PrimaryMenu( { items } ) {
	return (
		<nav id="site-navigation" className="main-navigation" role="navigation">
			<div className="menu-main-container">
				<ul id="menu-main" className="menu">
					{ items.map( item => <Item key={ item.id } item={ item } /> ) }
				</ul>
			</div>
		</nav>
	);
}

PrimaryMenu.propTypes = {
	items: PropTypes.array.isRequired,
};
