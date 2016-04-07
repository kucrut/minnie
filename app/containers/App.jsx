import React, { PropTypes } from 'react'


const App = ({ children }) => {
	return (
		<div id="page" className="hfeed site">
			{children}
		</div>
	)
}

App.propTypes = {
	children: PropTypes.object
}

export default App
