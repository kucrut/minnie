import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import he from 'he'

export default class MenuItem extends Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	renderLink( item ) {
		let title = he.decode( item.title )

		if ( '/' === item.url ) {
			return (
				<IndexLink to={ item.url } onlyActiveOnIndex={true} activeClassName="current-menu-item">{ title }</IndexLink>
			)
		} else {
			return (
				<Link to={ item.url } activeClassName="current-menu-item">{ title }</Link>
			)
		}
	}

	renderChildren() {
		const { children } = this.props.item

		if ( children.length ) {
			return (
				<ul className="sub-menu">
					{ children.map( child => <MenuItem key={ child.id } item={ child } /> ) }
				</ul>
			)
		}
	}

	render() {
		const { item } = this.props
		const id = `menu-item-${item.id}`

		return (
			<li id={ id } className={ `menu-item ${id}` }>
				{ this.renderLink( item ) }
				{ this.renderChildren() }
			</li>
		)
	}
}
