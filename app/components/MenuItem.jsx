import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import he from 'he';


export default class MenuItem extends Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	renderLink( item ) {
		const title = he.decode( item.title );
		let el;

		if ( '/' === item.url ) {
			el = (
				<IndexLink
					to={ item.url }
					onlyActiveOnIndex={ true }
					activeClassName="current-menu-item"
				>{ title }</IndexLink>
			);
		} else {
			el = (
				<Link to={ item.url } activeClassName="current-menu-item">{ title }</Link>
			);
		}

		return el;
	}

	renderChildren() {
		const { children } = this.props.item;
		let el;

		if ( children.length ) {
			el = (
				<ul className="sub-menu">
					{ children.map( child => <MenuItem key={ child.id } item={ child } /> ) }
				</ul>
			);
		}

		return el;
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
