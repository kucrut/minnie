import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'


class PrimaryMenu extends Component {
	getLink( item ) {
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
		return (
			<nav id="site-navigation" className="main-navigation" role="navigation">
				<div className="menu-main-container">
					<ul id="menu-main" className="menu">
						{ this.props.items.map( item => {
							const id = `menu-item-${item.ID}`

							return (
								<li key={ id } id={ id } className={ `menu-item ${id}` }>
									{ this.getLink( item ) }
								</li>
							)
						}) }
					</ul>
				</div>
			</nav>
		)
	}
}

PrimaryMenu.propTypes = {
	items: PropTypes.array.isRequired
}

export default PrimaryMenu
