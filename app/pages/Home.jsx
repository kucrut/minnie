import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'


class Home extends Component {
	render() {
		return (
			<div className="content">
				<Helmet title={ `${ info.name }` } />
				<h1>Home content.</h1>
			</div>
		)
	}
}

Home.propTypes = {
	info: PropTypes.object.isRequired
}

function mapStateToProps( state ) {
	return {
		info: state.info
	}
}

export default connect( mapStateToProps )( Home )
