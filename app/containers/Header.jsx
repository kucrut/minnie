import React, { Component, PropTypes } from 'react'
import Branding from 'components/Branding'
import Navigation from 'components/Navigation'


class Header extends Component {
	constructor( props ) {
		super( props )
	}

	render() {
		return (
			<header id="masthead" className="site-header" role="banner">
				<Branding />
				<Navigation />
			</header>
		)
	}
}

export default Header
