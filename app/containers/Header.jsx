import React, { Component, PropTypes } from 'react'
import Branding from 'components/Branding'
import SocialNavigation from 'components/SocialNavigation'


class Header extends Component {
	constructor( props ) {
		super( props )
	}

	render() {
		return (
			<header id="masthead" className="site-header" role="banner">
				<Branding />
				<SocialNavigation />
			</header>
		)
	}
}

export default Header
