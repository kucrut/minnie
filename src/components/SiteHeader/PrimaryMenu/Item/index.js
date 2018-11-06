import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import he from 'he';

export default function Item( props ) {
	const { item } = props;
	const { children, id, title, url } = item;
	const idAttr = `menu-item-${ id }`;
	const text = he.decode( title );

	return (
		<li id={ idAttr } className={ `menu-item ${ idAttr }` }>
			<NavLink exact to={ url } activeClassName="current-menu-item">{ text }</NavLink>
			{ children.length ? (
				<ul className="sub-menu">
					{ children.map( child => <Item key={ child.id } item={ child } /> ) }
				</ul>
			) : null }
		</li>
	);
}

Item.propTypes = {
	item: PropTypes.object.isRequired,
};
