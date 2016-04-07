import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'


class Navigation extends Component {
	constructor( props ) {
		super( props )
	}

	render() {
		// TODO: Get menu-items from props.
		return (
			<div className="social-links">
				<ul className="menu">
					<li className="menu-item"><Link to="/">Home</Link></li>
					<li className="menu-item"><Link to="/page">Single Page</Link></li>
					<li className="menu-item"><Link to="/post">Single Post</Link></li>
				</ul>
			</div>
		)
	}
}

export default connect()( Navigation )
