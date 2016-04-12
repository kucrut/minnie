import React, { PropTypes } from 'react'
import { Link } from 'react-router'


const Branding = ({ name }) => {
	return (
		<div className="site-branding">
			<h1 className="site-title"><Link to="/">{ name }</Link></h1>
		</div>
	)
}

Branding.propTypes = {
	name: PropTypes.string.isRequired
}

export default Branding
