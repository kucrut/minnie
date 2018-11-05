import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import he from 'he';

export default function MenuItem( props ) {
	const { item } = props;
	const { children, id, title, url } = item;
	const idAttr = `menu-item-${ id }`;
	const text = he.decode( title );

	return (
		<li id={ idAttr } className={ `menu-item ${ idAttr }` }>
			<NavLink exact to={ url } activeClassName="current-menu-item">{ text }</NavLink>
			{ children.length ? (
				<ul className="sub-menu">
					{ children.map( child => <MenuItem key={ child.id } item={ child } /> ) }
				</ul>
			) : null }
		</li>
	);
}

MenuItem.propTypes = {
	item: PropTypes.object.isRequired,
};
