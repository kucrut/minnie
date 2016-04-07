import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Singular extends Component {
	constructor( props ) {
		super( props )
	}

	render() {
		const { pathname } = this.props

		return (
			<div className="content">
				<h1>Singular content</h1>
				<p>Path: <code>{pathname}</code></p>
			</div>
		)
	}
}

Singular.propTypes = {
	pathname: PropTypes.string
}

function mapStateToProps( state, ownProps ) {
	return {
		pathname: ownProps.location.pathname
	}
}

export default connect( mapStateToProps )( Singular );
