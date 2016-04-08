import React, { Component, PropTypes } from 'react'


class Burger extends Component {
	constructor( props ) {
		super( props )
		this.onClick = this.onClick.bind( this )
	}

	onClick() {
		// TODO
	}

	render() {
		return (
			<button className="menu-toggle" title="Sidebar" onClick={ this.onClick }>
				<span className="screen-reader-text">Sidebar</span>
			</button>
		)
	}
}

export default Burger
