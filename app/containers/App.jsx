import React, { PropTypes } from 'react'
import Header from 'containers/Header'


const App = ({ children }) => {
	return (
		<div id="page" className="hfeed site">
			<Header />
			<div id="content" className="site-content">
				{children}
			</div>
		</div>
	)
}

App.propTypes = {
	children: PropTypes.object
}

export default App
