import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import { stripApiHost } from 'helpers.js'


class MenuItem extends Component {
	renderLink( item ) {
		if ( '/' === item.url ) {
			return (
				<IndexLink to={ item.url } onlyActiveOnIndex={true} activeClassName="current-menu-item">{ item.title }</IndexLink>
			)
		} else {
			return (
				<Link to={ item.url } activeClassName="current-menu-item">{ item.title }</Link>
			)
		}
	}

	render() {
		const { item } = this.props
		const id = `menu-item-${item.ID}`

		return (
			<li id={ id } className={ `menu-item ${id}` }>
				{ this.renderLink( item ) }
			</li>
		)
	}
}

MenuItem.propTypes = {
	item: PropTypes.object.isRequired
}

export default MenuItem
