import React, { Component, PropTypes } from 'react'
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
	children: PropTypes.object
}

export default App
