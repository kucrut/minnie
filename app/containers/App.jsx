import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import qs from 'qs'
import axios from 'axios'
import bind from 'lodash/bind'
import classNames from 'classnames'
import { fetchInfo } from 'actions/info'
import { fetchMenu } from 'actions/menu'
import { fetchPostFormats } from 'actions/terms'
import Header from 'containers/Header'
import Footer from 'containers/Footer'


class App extends Component {

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
		bind( fetchMenu, {location: 'social'} ),
		bind( fetchMenu, {location: 'primary'} )
	]

	componentDidMount() {
		// configure baseURL for axios requests (for client-side API calls)
		axios.defaults.baseURL = this.props.apiUrl
		axios.defaults.paramsSerializer = params => qs.stringify( params, {arrayFormat: 'brackets'} )
		axios.defaults.headers = {'X-Requested-With': 'minnie'}

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

App.propTypes = {
	apiUrl: PropTypes.string.isRequired,
	isSidebarExpanded: PropTypes.bool.isRequired,
	children: PropTypes.object
}

function mapStateToProps( state ) {
	return {
		apiUrl: state.info.apiUrl,
		isSidebarExpanded: state.ui.isSidebarExpanded
	}
}

export default connect( mapStateToProps )( App )
