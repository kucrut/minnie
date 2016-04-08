import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Branding from 'components/Branding'
import SocialMenu from 'components/SocialMenu'


class Header extends Component {
	constructor( props ) {
		super( props )
	}

	renderSocialMenu() {
		const { menus } = this.props

		if ( menus.social && menus.social.length ) {
			return (
				<SocialMenu items={ menus.social } />
			)
		}
	}

	render() {
		return (
			<header id="masthead" className="site-header" role="banner">
				<Branding info={ this.props.info } />
				{ this.renderSocialMenu() }
			</header>
		)
	}
}

Header.propTypes = {
	info: PropTypes.object.isRequired,
	menus: PropTypes.object.isRequired
}

function mapStateToProps( state ) {
	return {
		info: state.info,
		menus: state.menu.menus
	}
}

export default connect( mapStateToProps )( Header )
