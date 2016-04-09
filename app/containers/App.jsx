import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import bind from 'lodash/bind'
import classNames from 'classnames'
import { fetchInfo } from 'actions/info'
import { fetchMenu } from 'actions/menu'
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
		bind( fetchMenu, {location: 'social'} ),
		bind( fetchMenu, {location: 'primary'} )
	]

	componentDidMount() {
		// configure baseURL for axios requests (for client-side API calls)
		axios.defaults.baseURL = this.props.apiUrl;
	}

	render() {
		let pageClass = classNames({
			'hfeed site': true,
			'sidebar-open': this.props.isSidebarExpanded
		})

		return (
			<div id="page" className={ pageClass }>
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
