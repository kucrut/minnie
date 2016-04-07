import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


class Branding extends Component {
	constructor( props ) {
		super( props )
	}

	render() {
		return (
			<div className="site-branding">
				<h1 className="site-title"><Link to="/">Minnie</Link></h1>
				<h2>WordPress, Reactified.</h2>
			</div>
		)
	}
}

export default Branding
