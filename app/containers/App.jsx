import React, { PropTypes } from 'react'
import Navigation from 'containers/Navigation.jsx'

const App = ({ children }) => {
	return (
		<div id="page" className="hfeed site">
			<Navigation />
			{children}
		</div>
	)
}

App.propTypes = {
	children: PropTypes.object
}

export default App
