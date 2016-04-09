import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


class Branding extends Component {
	getDescription() {
		const { description } = this.props.info

		if ( '' !== description ) {
			return (
				<h2>{ description }</h2>
			)
		}
	}

	render() {
		const { name, description } = this.props.info

		return (
			<div className="site-branding">
				<h1 className="site-title"><Link to="/">{ name }</Link></h1>
				{ this.getDescription() }
			</div>
		)
	}
}

Branding.propTypes = {
	info: PropTypes.object.isRequired
}

export default Branding
