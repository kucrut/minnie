import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchMedia } from 'actions/singular'
import _Singular from 'pages/_Singular'

class Media extends _Singular {

	/**
	 * Callbacks needed for server-side rendering
	 *
	 * Functions listed here will be called automatically by `fetchComponentDataBeforeRender()`
	 *     when this component is rendered by the server.
	 *
	 * @type {Array}
	 */
	static need = [
		fetchMedia
	]

	static displayName = 'Media'

	fetchData( slug ) {
		this.props.dispatch( fetchMedia({ slug }) )
	}
}

function mapStateToProps( state, ownProps ) {
	const { slug } = ownProps.params

	return {
		slug: slug,
		info: state.info,
		singular: state.singular
	}
}

export default connect( mapStateToProps )( Media )
