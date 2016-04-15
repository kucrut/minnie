import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPage } from 'actions/singular'
import _Singular from 'pages/_Singular'

class Page extends _Singular {

	/**
	 * Callbacks needed for server-side rendering
	 *
	 * Functions listed here will be called automatically by `fetchComponentDataBeforeRender()`
	 *     when this component is rendered by the server.
	 *
	 * @type {Array}
	 */
	static need = [
		fetchPage
	]

	static displayName = 'Page'

	constructor( props ) {
		super( props )
	}

	fetchData( slug ) {
		this.props.dispatch( fetchPage({ slug }) )
	}
}

export function mapStateToProps( state, ownProps ) {
	const { slug } = ownProps.params

	return {
		slug: slug,
		info: state.info,
		singular: state.singular
	}
}

export default connect( mapStateToProps )( Page )
