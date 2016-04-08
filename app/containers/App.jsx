import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchInfo } from 'actions/info'
import Header from 'containers/Header'
import Footer from 'containers/Footer'


class App extends Component {
	constructor( props ) {
		super( props )
	}

	static need = [
		fetchInfo
	]

	componentDidMount() {
		// configure baseURL for axios requests (for client-side API calls)
		axios.defaults.baseURL = this.props.apiUrl;
	}

	render() {
		return (
			<div id="page" className="hfeed site">
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
	children: PropTypes.object
}

function mapStateToProps( state ) {
	return {
		apiUrl: state.info.apiUrl
	}
}

export default connect( mapStateToProps )( App )
