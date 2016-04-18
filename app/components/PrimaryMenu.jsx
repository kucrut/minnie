import React, { PropTypes } from 'react'
import MenuItem from 'components/MenuItem'


const PrimaryMenu = ({ items }) => {
	return (
		<nav id="site-navigation" className="main-navigation" role="navigation">
			<div className="menu-main-container">
				<ul id="menu-main" className="menu">
					{ items.map( item => <MenuItem key={ item.id } item={ item } /> ) }
				</ul>
			</div>
		</nav>
	)
}

PrimaryMenu.propTypes = {
	items: PropTypes.array.isRequired
}

export default PrimaryMenu
