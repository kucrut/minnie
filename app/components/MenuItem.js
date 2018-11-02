import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import he from 'he';

export default class MenuItem extends Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
	}

	renderLink( item ) {
		const title = he.decode( item.title );

		return <NavLink to={ item.url } activeClassName="current-menu-item">{ title }</NavLink>;
	}

	renderChildren() {
		const { item } = this.props;
		const { children } = item;

		if ( ! children.length ) {
			return null;
		}

		return (
			<ul className="sub-menu">
				{ children.map( child => <MenuItem key={ child.id } item={ child } /> ) }
			</ul>
		);
	}

	render() {
		const { item } = this.props;
		const id = `menu-item-${item.id}`;

		return (
			<li id={ id } className={ `menu-item ${id}` }>
				{ this.renderLink( item ) }
				{ this.renderChildren() }
			</li>
		);
	}
}
