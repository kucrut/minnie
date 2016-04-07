import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'


class Navigation extends Component {
	constructor( props ) {
		super( props )
	}

	render() {
		return (
			<nav className="menu">
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/page">Single Page</Link></li>
					<li><Link to="/post">Single Post</Link></li>
				</ul>
			</nav>
		)
	}
}

export default connect()( Navigation )
