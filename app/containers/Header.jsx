import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Sidebar from 'containers/Sidebar'
import Branding from 'components/Branding'
import SocialMenu from 'components/SocialMenu'
import Burger from 'components/Burger'


class Header extends Component {
	static propTypes = {
		info: PropTypes.object.isRequired,
		menus: PropTypes.object.isRequired
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
				<Branding name={ this.props.info.name } />
				{ this.renderSocialMenu() }
				<Burger />
				<Sidebar />
			</header>
		)
	}
}

function mapStateToProps( state ) {
	return {
		info: state.info,
		menus: state.menu.menus
	}
}

export default connect( mapStateToProps )( Header )
