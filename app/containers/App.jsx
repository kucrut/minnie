import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { configureAxios } from 'helpers.js'
import { fetchInfo } from 'actions/info'
import { fetchPostFormats } from 'actions/terms'
import { fetchPrimaryMenu, fetchSocialMenu } from 'actions/menu'
import Header from 'containers/Header'
import Footer from 'containers/Footer'

require( 'css/genericons/genericons/genericons.css' )
require( 'css/style.css' )


class App extends Component {

	static propTypes = {
		apiUrl: PropTypes.string.isRequired,
		isSidebarExpanded: PropTypes.bool.isRequired,
		children: PropTypes.object
	}

	/**
	 * Callbacks needed for server-side rendering
	 *
	 * Functions listed here will be called automatically by `fetchComponentDataBeforeRender()`
	 *     when this component is rendered by the server.
	 *
	 * @type {Array}
	 */
	static need = [
		fetchInfo,
		fetchPostFormats,
		fetchPrimaryMenu,
		fetchSocialMenu
	]

	componentDidMount() {
		configureAxios( this.props.apiUrl )
	}

	render() {
		let pageClass = classNames({
			'hfeed site': true,
			'sidebar-open': this.props.isSidebarExpanded
		})

		return (
			<div id="page" className={ pageClass }>
				<a className="skip-link screen-reader-text" href="#content">Skip to content</a>

				<Header />

				<div id="content" className="site-content">
					{ this.props.children }
				</div>

				<Footer />
			</div>
		)
	}
}

function mapStateToProps( state ) {
	return {
		apiUrl: state.info.apiUrl,
		isSidebarExpanded: state.ui.isSidebarExpanded
	}
}

export default connect( mapStateToProps )( App )
